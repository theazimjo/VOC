import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useSearchParams } from 'react-router-dom';
import {
  getCenterTeachers, createTeacher, updateTeacherPassword, removeTeacherFromCenter, getCenterCustomPacks, getCenterGroups,
  getCenter, updateCenter, deleteCustomPack, duplicateCustomPack, createCustomPack, updateCustomPack,
  ensureIrregularVerbsPack, getGroupStudents, getOrCreateTeacherJoinCode, regenerateTeacherJoinCode,
  getCenterPendingTeachers, approveTeacherRequest, rejectTeacherRequest,
} from '../../../services/corpService';
import CredentialsModal from '../../../components/corp/CredentialsModal';
import ConfirmSheet from '../../../components/corp/ConfirmSheet';
import { BEGINNER_ENGLISH_PACK } from '../../../data/beginnerEnglishCoursePack';
import { IRREGULAR_VERBS_PACK_ID } from '../../../data/irregularVerbsCorpPack';
import DashboardTab from './tabs/DashboardTab';
import TeachersTab from './tabs/TeachersTab';
import CoursesTab from './tabs/CoursesTab';
import StudentsTab from './tabs/StudentsTab';
import StatisticsTab from './tabs/StatisticsTab';
import SettingsTab from './tabs/SettingsTab';
import AddTeacherModal from './modals/AddTeacherModal';
import ResetPasswordModal from './modals/ResetPasswordModal';
import './shared.css';
import './CenterAdminDashboard.css';

export default function CenterAdminDashboard({ tab = 'dashboard' }) {
  const context = useOutletContext() || {};
  const navigate = useNavigate();
  const centerId = context.centerId || 'demo_center_1';
  const initialCenterName = context.centerName || 'O\'quv Markazi';

  const [centerName, setCenterName] = useState(initialCenterName);
  const [centerEmail, setCenterEmail] = useState('');
  const [centerPhone, setCenterPhone] = useState('');
  const [centerAddress, setCenterAddress] = useState('');
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [customPacks, setCustomPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [courseSortBy, setCourseSortBy] = useState('date'); // date | name | units | words
  const [courseSortOrder, setCourseSortOrder] = useState('desc');
  const [showCourseSortMenu, setShowCourseSortMenu] = useState(false);
  const [activeTeacherMenu, setActiveTeacherMenu] = useState(null);
  const [teacherMenuPos, setTeacherMenuPos] = useState({ top: 0, right: 0 });

  // Self-service teacher join — the code a prospective teacher enters in
  // their own Settings to attach themselves to this center.
  const [teacherJoinCode, setTeacherJoinCode] = useState('');
  const [copiedTeacherCode, setCopiedTeacherCode] = useState(false);
  const [regeneratingTeacherCode, setRegeneratingTeacherCode] = useState(false);
  const [pendingTeacherRequests, setPendingTeacherRequests] = useState([]);
  const [processingRequestUid, setProcessingRequestUid] = useState(null);

  // Students tab: every student across every group in the center, fetched
  // lazily (only once the tab is actually visited) since it's an N+1 read
  // across every group's own students subtree — same lazy pattern as the
  // teacher module's teacher-wide "Statistika" tab.
  const [allGroupsStudents, setAllGroupsStudents] = useState({}); // groupId -> students[]
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');

  // Modals & Routing
  const [searchParams, setSearchParams] = useSearchParams();
  const courseIdFromUrl = searchParams.get('courseId');
  const managingCourse = customPacks.find(p => p.id === courseIdFromUrl) || null;
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showPackEditor, setShowPackEditor] = useState(false);
  const [editingPack, setEditingPack] = useState(null);
  const [seedingCourse, setSeedingCourse] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const [teacherForm, setTeacherForm] = useState({ name: '', phone: '', password: '' });
  const [submittingTeacher, setSubmittingTeacher] = useState(false);

  const [resetPasswordTeacher, setResetPasswordTeacher] = useState(null);
  const [newTeacherPassword, setNewTeacherPassword] = useState('');
  const [submittingPasswordReset, setSubmittingPasswordReset] = useState(false);

  // iOS-style action-sheet confirm dialog — replaces window.confirm() for
  // every destructive/irreversible action, same pattern as the teacher
  // module.
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

  const handleUpdateTeacherPassword = async (e) => {
    e.preventDefault();
    if (!newTeacherPassword.trim() || newTeacherPassword.trim().length < 6) {
      alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    setSubmittingPasswordReset(true);
    try {
      const teacher = resetPasswordTeacher;
      const pwd = newTeacherPassword.trim();
      await updateTeacherPassword(centerId, teacher.id, teacher.uid, pwd);
      const targetIdentifier = teacher.phone || teacher.email;
      setResetPasswordTeacher(null);
      setCredentials({ email: targetIdentifier, tempPassword: pwd });
    } catch (err) {
      alert("Parolni yangilashda xatolik: " + err.message);
    } finally {
      setSubmittingPasswordReset(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [teachersData, packsData, groupsData, centerData, irregularPack, joinCode, pendingRequestsData] = await Promise.all([
        getCenterTeachers(centerId),
        getCenterCustomPacks(centerId),
        getCenterGroups(centerId),
        getCenter(centerId),
        ensureIrregularVerbsPack(centerId).catch(err => {
          console.error('Error ensuring Irregular Verbs pack:', err);
          return null;
        }),
        getOrCreateTeacherJoinCode(centerId).catch(err => {
          console.error('Error getting teacher join code:', err);
          return '';
        }),
        getCenterPendingTeachers(centerId).catch(err => {
          console.error('Error loading pending teacher requests:', err);
          return [];
        }),
      ]);

      setTeachers(teachersData || []);
      setTeacherJoinCode(joinCode || '');
      setPendingTeacherRequests(pendingRequestsData || []);
      // Packs a teacher created privately (ownerUid set) never show up in
      // the admin's course library — only center-wide packs the admin (or
      // any teacher, before this) created.
      const scopedPacks = (packsData || []).filter(p => !p.ownerUid);
      // Always replaced with ensureIrregularVerbsPack's own return value
      // rather than trusting whatever getCenterCustomPacks read — that read
      // runs concurrently with ensure()'s write/self-heal above, so it can
      // easily win the race and hand back a stale copy (e.g. pre-rename
      // set/unit titles) even though ensure() already fixed it server-side.
      const scopedWithoutStaleIrregular = scopedPacks.filter(p => p.id !== IRREGULAR_VERBS_PACK_ID);
      setCustomPacks(
        irregularPack
          ? [...scopedWithoutStaleIrregular, irregularPack]
          : scopedPacks
      );
      setGroups(groupsData || []);

      if (centerData) {
        setCenterName(centerData.name || initialCenterName);
        setCenterEmail(centerData.email || '');
        setCenterPhone(centerData.phone || '');
        setCenterAddress(centerData.address || '');
      }
    } catch (err) {
      console.error('Error loading center admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [centerId]);

  // Fetch every group's student list only once the Students tab is
  // actually visited, and only for groups not already fetched.
  useEffect(() => {
    if (tab !== 'students' || !centerId) return;
    const missingIds = groups.map(g => g.id).filter(id => !(id in allGroupsStudents));
    if (missingIds.length === 0) return;

    let cancelled = false;
    setLoadingStudents(true);
    Promise.all(missingIds.map(id => getGroupStudents(centerId, id).then(list => [id, list || []])))
      .then(entries => {
        if (cancelled) return;
        setAllGroupsStudents(prev => {
          const next = { ...prev };
          entries.forEach(([id, list]) => { next[id] = list; });
          return next;
        });
      })
      .catch(err => console.error('Error loading center students:', err))
      .finally(() => { if (!cancelled) setLoadingStudents(false); });

    return () => { cancelled = true; };
  }, [tab, centerId, groups]);

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!teacherForm.name.trim() || !teacherForm.phone.trim() || !teacherForm.password.trim()) {
      alert("Iltimos, barcha maydonlarni (F.I.Sh, Telefon raqam va Parol) to'ldiring!");
      return;
    }
    setSubmittingTeacher(true);
    try {
      const newTeacher = await createTeacher(centerId, centerName, teacherForm);
      const formatted = {
        id: newTeacher.id || Date.now().toString(),
        name: teacherForm.name.trim(),
        phone: teacherForm.phone.trim(),
        email: teacherForm.phone.trim(),
        subject: 'Ingliz tili',
        groupsCount: 0,
        studentsCount: 0,
        status: 'Faol'
      };
      setTeachers(prev => [formatted, ...prev]);
      setTeacherForm({ name: '', phone: '', password: '' });
      setShowTeacherModal(false);
      setCredentials({ email: teacherForm.phone.trim(), tempPassword: teacherForm.password.trim() });
    } catch (err) {
      alert('O\'qituvchi qo\'shishda xatolik: ' + err.message);
    } finally {
      setSubmittingTeacher(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await updateCenter(centerId, {
        name: centerName,
        email: centerEmail,
        phone: centerPhone,
        address: centerAddress,
      });
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch (err) {
      alert("Sozlamalarni saqlashda xatolik: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  // Confirmation lives at the call site (askConfirm's ConfirmSheet) — these
  // are pure actions.
  const handleDeleteTeacher = async (teacher) => {
    try {
      await removeTeacherFromCenter(centerId, teacher.id, teacher.uid);
      setTeachers(prev => prev.filter(t => t.id !== teacher.id));
    } catch (err) {
      alert("O'qituvchini o'chirishda xatolik: " + err.message);
    }
  };

  const handleCopyTeacherCode = () => {
    if (!teacherJoinCode) return;
    navigator.clipboard.writeText(teacherJoinCode);
    setCopiedTeacherCode(true);
    setTimeout(() => setCopiedTeacherCode(false), 2000);
  };

  const handleRegenerateTeacherCode = () => {
    askConfirm({
      title: "Regenerate ID",
      message: "Generate a new teacher join ID? The old one will stop working.",
      confirmLabel: 'Generate',
      cancelLabel: 'Cancel',
      onConfirm: async () => {
        setRegeneratingTeacherCode(true);
        try {
          const newCode = await regenerateTeacherJoinCode(centerId);
          setTeacherJoinCode(newCode);
        } catch (err) {
          alert("Error regenerating ID: " + err.message);
        } finally {
          setRegeneratingTeacherCode(false);
        }
      },
    });
  };

  const handleApproveTeacherRequest = async (uid) => {
    setProcessingRequestUid(uid);
    try {
      await approveTeacherRequest(centerId, uid);
      setPendingTeacherRequests(prev => prev.filter(r => r.uid !== uid));
      const teachersData = await getCenterTeachers(centerId);
      setTeachers(teachersData || []);
    } catch (err) {
      alert("Error approving request: " + err.message);
    } finally {
      setProcessingRequestUid(null);
    }
  };

  const handleRejectTeacherRequest = (request) => {
    askConfirm({
      title: "Reject Request",
      message: `Reject ${request.name}'s request to join as a teacher?`,
      confirmLabel: 'Reject',
      cancelLabel: 'Cancel',
      danger: true,
      onConfirm: async () => {
        setProcessingRequestUid(request.uid);
        try {
          await rejectTeacherRequest(centerId, request.uid);
          setPendingTeacherRequests(prev => prev.filter(r => r.uid !== request.uid));
        } catch (err) {
          alert("Error rejecting request: " + err.message);
        } finally {
          setProcessingRequestUid(null);
        }
      },
    });
  };

  const handleDeleteCourse = async (id) => {
    if (id === IRREGULAR_VERBS_PACK_ID) {
      alert("Bu tizim packi — barcha markazlarda umumiy ishlatiladi va o'chirib bo'lmaydi.");
      return;
    }
    try {
      await deleteCustomPack(centerId, id);
      setCustomPacks(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Kursni o'chirishda xatolik: " + err.message);
    }
  };

  const handleDuplicateCourse = async (course) => {
    try {
      const original = customPacks.find(p => p.id === course.id);
      if (!original) return;
      const duplicated = await duplicateCustomPack(centerId, original);
      setCustomPacks(prev => [duplicated, ...prev]);
    } catch (err) {
      alert("Kursni nusxalashda xatolik: " + err.message);
    }
  };

  // One-click: create the ready-made Beginner English pack (3 months, 15
  // units, 332 words) fully populated in a single write, instead of
  // manually adding months/units and importing each unit's words by hand.
  const handleSeedBeginnerCourse = async () => {
    setSeedingCourse(true);
    try {
      const { title, level, description, months } = BEGINNER_ENGLISH_PACK;
      const pack = await createCustomPack(centerId, { title, level, description });

      const units = months.flatMap(m => m.units);
      const words = units.flatMap(u => u.words);
      const updates = { months, units, words, sectionsCount: units.length, wordCount: words.length };
      await updateCustomPack(centerId, pack.id, updates);

      const fullPack = { ...pack, ...updates };
      setCustomPacks(prev => [fullPack, ...prev]);
      setSearchParams({ courseId: pack.id });
    } catch (err) {
      alert("Tayyor kursni yuklashda xatolik: " + err.message);
    } finally {
      setSeedingCourse(false);
    }
  };

  // Real per-teacher group/student counts, derived from this center's actual
  // groups (a teacher record itself doesn't carry these — they're computed,
  // not stored, so they can never drift out of sync with the groups list).
  const teachersWithStats = teachers.map(t => {
    const ownGroups = groups.filter(g => g.teacherId === t.id);
    return {
      ...t,
      groupsCount: ownGroups.length,
      studentsCount: ownGroups.reduce((sum, g) => sum + (g.studentsCount || 0), 0),
    };
  });
  const filteredTeachersWithStats = teachersWithStats.filter(t =>
    t.name.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(teacherSearchTerm.toLowerCase())
  );

  // Flat "every student in the center" list, each one tagged with its
  // group and teacher — the students subtree is only ever stored nested
  // under its own group, so this is the one place that view actually gets
  // assembled.
  const allStudents = groups.flatMap(g => {
    const teacher = teachers.find(t => t.id === g.teacherId);
    return (allGroupsStudents[g.id] || []).map(st => ({
      ...st,
      groupId: g.id,
      groupName: g.name,
      teacherName: teacher?.name || "Noma'lum",
    }));
  });
  const filteredStudents = allStudents.filter(st =>
    (st.name || '').toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    (st.email || '').toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
    (st.groupName || '').toLowerCase().includes(studentSearchTerm.toLowerCase())
  );

  const allCourses = customPacks.map(p => {
    const packGroups = groups.filter(g => (g.assignedPacks || []).includes(p.id));
    return {
      id: p.id,
      title: p.title,
      description: p.description || 'Tavsif yo\'q',
      sectionsCount: p.sectionsCount || 0,
      wordsCount: p.wordCount || (p.words ? p.words.length : 0),
      groupsCount: packGroups.length,
      studentsCount: packGroups.reduce((sum, g) => sum + (g.studentsCount || 0), 0),
      createdAt: p.createdAt ? new Date(p.createdAt).getTime() : 0,
      active: false
    };
  });

  const filteredCourses = allCourses
    .filter(c =>
      c.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(courseSearchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let cmp;
      switch (courseSortBy) {
        case 'name': cmp = a.title.localeCompare(b.title); break;
        case 'units': cmp = a.sectionsCount - b.sectionsCount; break;
        case 'words': cmp = a.wordsCount - b.wordsCount; break;
        case 'date':
        default: cmp = a.createdAt - b.createdAt; break;
      }
      return courseSortOrder === 'asc' ? cmp : -cmp;
    });

  // Teacher Counts
  const totalTeachers = teachers.length;
  const totalTeacherGroups = teachersWithStats.reduce((sum, t) => sum + t.groupsCount, 0);
  const totalTeacherStudents = teachersWithStats.reduce((sum, t) => sum + t.studentsCount, 0);
  const avgGroups = totalTeachers ? Math.round(totalTeacherGroups / totalTeachers) : 0;
  const avgStudents = totalTeachers ? Math.round(totalTeacherStudents / totalTeachers) : 0;

  // Course counts
  const totalCourses = allCourses.length;
  const totalSections = allCourses.reduce((sum, c) => sum + (c.sectionsCount || 0), 0);
  const totalWords = allCourses.reduce((sum, c) => sum + (c.wordsCount || 0), 0);
  const totalCourseStudents = groups.reduce((sum, g) => sum + (g.studentsCount || 0), 0);

  // Single bundle handed to every extracted tab/modal component below —
  // avoids re-deriving a bespoke prop list per file while keeping all the
  // state/handlers/derived data declared in exactly one place (here).
  const p = {
    centerId, navigate,
    centerName, setCenterName, centerEmail, setCenterEmail, centerPhone, setCenterPhone,
    centerAddress, setCenterAddress, settingsSaved, setSettingsSaved, savingSettings, setSavingSettings,
    teachers, setTeachers, groups, setGroups, customPacks, setCustomPacks, loading, setLoading,
    teacherSearchTerm, setTeacherSearchTerm, courseSearchTerm, setCourseSearchTerm,
    courseSortBy, setCourseSortBy, courseSortOrder, setCourseSortOrder,
    showCourseSortMenu, setShowCourseSortMenu,
    activeTeacherMenu, setActiveTeacherMenu, teacherMenuPos, setTeacherMenuPos,
    teacherJoinCode, copiedTeacherCode, handleCopyTeacherCode, handleRegenerateTeacherCode, regeneratingTeacherCode,
    pendingTeacherRequests, processingRequestUid, handleApproveTeacherRequest, handleRejectTeacherRequest,
    searchParams, setSearchParams, managingCourse,
    showTeacherModal, setShowTeacherModal, showPackEditor, setShowPackEditor,
    editingPack, setEditingPack, seedingCourse, setSeedingCourse, credentials, setCredentials,
    teacherForm, setTeacherForm, submittingTeacher, setSubmittingTeacher,
    resetPasswordTeacher, setResetPasswordTeacher, newTeacherPassword, setNewTeacherPassword,
    submittingPasswordReset, setSubmittingPasswordReset,
    handleUpdateTeacherPassword, handleAddTeacher, handleSaveSettings, handleDeleteTeacher,
    handleDeleteCourse, handleDuplicateCourse, handleSeedBeginnerCourse,
    askConfirm,
    teachersWithStats, filteredTeachersWithStats, allCourses, filteredCourses,
    totalTeachers, totalTeacherGroups, totalTeacherStudents, avgGroups, avgStudents,
    totalCourses, totalSections, totalWords, totalCourseStudents,
    allStudents, filteredStudents, loadingStudents, studentSearchTerm, setStudentSearchTerm,
  };

  return (
    <div className="center-admin-container">
      {tab === 'dashboard' && <DashboardTab p={p} />}
      {tab === 'teachers' && <TeachersTab p={p} />}
      {(tab === 'courses' || tab === 'packs') && <CoursesTab p={p} />}
      {tab === 'students' && <StudentsTab p={p} />}
      {tab === 'statistics' && <StatisticsTab p={p} />}
      {tab === 'settings' && <SettingsTab p={p} />}

      <AddTeacherModal p={p} />
      <ResetPasswordModal p={p} />

      {credentials && (
        <CredentialsModal
          title="O'qituvchi Akkaunti Ma'lumotlari"
          email={credentials.email}
          tempPassword={credentials.tempPassword}
          onClose={() => setCredentials(null)}
        />
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

