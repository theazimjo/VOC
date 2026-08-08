import { useState, useEffect, useRef } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { updatePassword } from 'firebase/auth';
import { Megaphone } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { auth } from '../../../firebase';
import {
  getTeacherGroups, createGroup, getCenterCustomPacks,
  assignPackToGroup, removePackFromGroup, getGroupStudents, duplicateCustomPack, deleteCustomPack,
  updateGroupStatus, updateGroupDetails, deleteGroup,
  getCenterTeachers, removeStudentFromGroup, updateTeacherProfile, getActiveAnnouncementsForRole,
  ensureIrregularVerbsPack, getGroupHomeworkList, addGroupHomework
} from '../../../services/corpService';
import { IRREGULAR_VERBS_PACK_ID } from '../../../data/irregularVerbsCorpPack';
import { getHomeworkCandidates, getUsedHomeworkKeys, computeGroupStats } from './utils';
import GroupsTab from './tabs/GroupsTab';
import ArchiveTab from './tabs/ArchiveTab';
import CoursesTab from './tabs/CoursesTab';
import StatisticsTab from './tabs/StatisticsTab';
import SettingsTab from './tabs/SettingsTab';
import TeacherModals from './modals/TeacherModals';
import './TeacherDashboard.css';
import '../CenterAdminDashboard.css';

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
      setShowGroupSettingsModal(false);
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

  const handleRemovePack = (groupId, packId, listKey = 'assignedPacks') => {
    const pack = customPacks.find(p => p.id === packId);
    const packTitle = pack ? pack.title : 'Pack';
    askConfirm({
      title: "Packni olib tashlash",
      message: `"${packTitle}" packini guruhdan olib tashlamoqchimisiz?`,
      confirmLabel: "Olib tashlash",
      danger: true,
      onConfirm: async () => {
        try {
          const updatedPacks = await removePackFromGroup(centerId, groupId, packId, listKey);
          setGroups(prev => prev.map(g => g.id === groupId ? { ...g, [listKey]: updatedPacks } : g));
          setAssigningGroup(prev => prev ? { ...prev, [listKey]: updatedPacks } : prev);
        } catch (err) {
          alert('Olib tashlashda xatolik: ' + err.message);
        }
      },
    });
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
  const [groupSettingsForm, setGroupSettingsForm] = useState({ name: '', level: 'Beginner', isArchived: false, code: '' });
  const [savingGroupSettings, setSavingGroupSettings] = useState(false);

  const handleOpenGroupSettings = (group) => {
    if (!group) return;
    setGroupSettingsTarget(group);
    setGroupSettingsForm({
      name: group.name || '',
      level: group.level || 'Beginner',
      isArchived: group.status === 'archived',
      code: group.code || '',
    });
  };

  const handleSaveGroupSettings = async (e) => {
    if (e) e.preventDefault();
    const targetGroup = groupSettingsTarget || selectedGroup;
    if (!targetGroup) return;
    setSavingGroupSettings(true);
    try {
      const updates = {};
      if (groupSettingsForm.name.trim()) {
        updates.name = groupSettingsForm.name.trim();
      }
      if (groupSettingsForm.level) {
        updates.level = groupSettingsForm.level;
      }
      if (Object.keys(updates).length > 0) {
        await updateGroupDetails(centerId, targetGroup.id, updates);
      }
      const newStatus = groupSettingsForm.isArchived ? 'archived' : 'active';
      if (newStatus !== (targetGroup.status || 'active')) {
        await updateGroupStatus(centerId, targetGroup.id, newStatus);
      }
      setGroups(prev => prev.map(g => g.id === targetGroup.id ? {
        ...g,
        ...updates,
        status: newStatus,
        code: groupSettingsForm.code || g.code
      } : g));
      alert("Guruh ma'lumotlari saqlandi!");
    } catch (err) {
      alert('Sozlamalarni saqlashda xatolik: ' + err.message);
    } finally {
      setSavingGroupSettings(false);
    }
  };

  const handleRegenerateCode = () => {
    const targetGroup = groupSettingsTarget || selectedGroup;
    if (!targetGroup) return;
    askConfirm({
      title: 'Yangi taklif kodi',
      message: "Yangi taklif kodi yaratilsinmi? Eski kod o'z kuchini yo'qotadi.",
      confirmLabel: 'Yaratish',
      onConfirm: async () => {
        try {
          const newCode = Math.floor(100000 + Math.random() * 900000).toString();
          await updateGroupDetails(centerId, targetGroup.id, { code: newCode });
          setGroupSettingsForm(prev => ({ ...prev, code: newCode }));
          setGroups(prev => prev.map(g => g.id === targetGroup.id ? { ...g, code: newCode } : g));
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
    const stId = student.id || student.uid;
    askConfirm({
      title: "O'quvchini chiqarish",
      message: `"${student.name}" o'quvchisini guruhdan chiqarmoqchimisiz?`,
      confirmLabel: 'Chiqarish',
      danger: true,
      onConfirm: async () => {
        try {
          await removeStudentFromGroup(centerId, selectedGroup.id, stId);
          setGroupStudentsList(prev => prev.filter(s => (s.id || s.uid) !== stId));
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

  useEffect(() => {
    if (selectedGroup) {
      setGroupSettingsTarget(selectedGroup);
      setGroupSettingsForm({
        name: selectedGroup.name || '',
        level: selectedGroup.level || 'Beginner',
        isArchived: selectedGroup.status === 'archived',
        code: selectedGroup.code || '',
      });
    }
  }, [selectedGroup]);

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

  // Single bundle handed to every extracted tab/modal component below —
  // avoids re-deriving a bespoke prop list per file while still keeping all
  // the state/handlers/derived data declared in exactly one place (here).
  const p = {
    navigate, urlGroupId, subTab, hwId, theme, setTheme, centerId,
    groups, setGroups, customPacks, setCustomPacks, loading, setLoading,
    searchTerm, setSearchTerm, showSearchInput, setShowSearchInput,
    showCreateModal, setShowCreateModal, showEditModal, setShowEditModal,
    showPackEditor, setShowPackEditor, viewingGroupStudents, setViewingGroupStudents,
    groupStudentsList, setGroupStudentsList, assigningGroup, setAssigningGroup,
    assignCategory, setAssignCategory, duplicatingPackId, setDuplicatingPackId,
    viewingPack, setViewingPack, selectedGroupId, setSelectedGroupId,
    showActionsDropdown, setShowActionsDropdown, allGroupsStudents, setAllGroupsStudents,
    loadingAllStats, setLoadingAllStats, groupHomeworkList, setGroupHomeworkList,
    homeworkSelection, setHomeworkSelection, savingHomework, setSavingHomework,
    showHomeworkEditor, setShowHomeworkEditor, viewingHomeworkItem, setViewingHomeworkItem,
    activeStudentMenu, setActiveStudentMenu, studentMenuPos, setStudentMenuPos,
    viewingStudentDetail, setViewingStudentDetail, showTransferPicker, setShowTransferPicker,
    centerTeachersList, setCenterTeachersList, loadingTransferTeachers, setLoadingTransferTeachers,
    activePackMenu, setActivePackMenu, packMenuPos, setPackMenuPos, editingPack, setEditingPack,
    confirmSheet, setConfirmSheet, confirmBusy, setConfirmBusy, announcements, setAnnouncements,
    groupForm, setGroupForm, editForm, setEditForm, submittingGroup, setSubmittingGroup,
    submittingEditGroup, setSubmittingEditGroup, copiedCode, setCopiedCode,
    profileForm, setProfileForm, savingSettings, setSavingSettings, settingsSuccess, setSettingsSuccess,
    showGroupSettingsModal, setShowGroupSettingsModal, groupSettingsTarget, setGroupSettingsTarget,
    groupSettingsForm, setGroupSettingsForm, savingGroupSettings, setSavingGroupSettings,
    askConfirm, closeConfirmSheet, runConfirmSheet,
    handleCreateGroup, handleOpenEditModal, handleUpdateGroup, handleDeleteGroup, copyCode,
    handleOpenStudentsModal, toggleHomeworkItem, openHomeworkEditor, handleAddHomework,
    handleAssignPack, handleRemovePack, handleDuplicatePack, handleDeletePack,
    handleArchiveGroup, handleRestoreGroup, handleSaveProfile,
    handleOpenGroupSettings, handleSaveGroupSettings, handleRegenerateCode,
    handleOpenTransferPicker, handleTransferGroupTo, handleRemoveStudent,
    activeGroups, archivedGroups, selectedGroup, filteredActiveGroups, filteredPacks,
    totalStudents, selectedGroupStats, allGroupsStats, overallAvgPercent,
  };

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

      {tab === 'groups' && <GroupsTab p={p} />}
      {tab === 'archive' && <ArchiveTab p={p} />}
      {tab === 'courses' && <CoursesTab p={p} />}
      {tab === 'statistics' && <StatisticsTab p={p} />}
      {tab === 'settings' && <SettingsTab p={p} />}

      <TeacherModals p={p} />
    </div>
  );
}
