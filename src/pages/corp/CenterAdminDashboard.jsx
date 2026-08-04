import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Building, Users, BookOpen, Book, Layers, Plus,
  GraduationCap, UserPlus, Sparkles,
  BarChart3, Settings, Save, CheckCircle2,
  ArrowRight, Mail, Download,
  Search, SlidersHorizontal, MoreHorizontal, MoreVertical, Target, Filter, ChevronDown,
  FileText, Copy, Edit3, Trash2, ArrowUpRight, KeyRound
} from 'lucide-react';
import {
  getCenterTeachers, createTeacher, updateTeacherPassword, removeTeacherFromCenter, getCenterCustomPacks, getCenterGroups,
  getCenter, updateCenter, deleteCustomPack, duplicateCustomPack, createCustomPack, updateCustomPack
} from '../../services/corpService';
import CustomPackEditor from '../../components/corp/CustomPackEditor';
import CourseManager from '../../components/corp/CourseManager';
import CredentialsModal from '../../components/corp/CredentialsModal';
import { BEGINNER_ENGLISH_PACK } from '../../data/beginnerEnglishCoursePack';
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
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);
  const [activeTeacherMenu, setActiveTeacherMenu] = useState(null);
  const [teacherMenuPos, setTeacherMenuPos] = useState({ top: 0, right: 0 });

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
      const [teachersData, packsData, groupsData, centerData] = await Promise.all([
        getCenterTeachers(centerId),
        getCenterCustomPacks(centerId),
        getCenterGroups(centerId),
        getCenter(centerId)
      ]);

      setTeachers(teachersData || []);
      // Packs a teacher created privately (ownerUid set) never show up in
      // the admin's course library — only center-wide packs the admin (or
      // any teacher, before this) created.
      setCustomPacks((packsData || []).filter(p => !p.ownerUid));
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

  const handleDeleteTeacher = async (teacher) => {
    if (!confirm(`"${teacher.name}" o'qituvchisini o'chirishni tasdiqlaysizmi?`)) return;
    try {
      await removeTeacherFromCenter(centerId, teacher.id, teacher.uid);
      setTeachers(prev => prev.filter(t => t.id !== teacher.id));
      setSelectedTeacherIds(prev => prev.filter(id => id !== teacher.id));
    } catch (err) {
      alert("O'qituvchini o'chirishda xatolik: " + err.message);
    }
  };

  const handleBulkDeleteTeachers = async () => {
    if (selectedTeacherIds.length === 0) return;
    if (!confirm(`${selectedTeacherIds.length} ta tanlangan o'qituvchini o'chirishni tasdiqlaysizmi?`)) return;
    try {
      for (const tId of selectedTeacherIds) {
        const teacher = teachers.find(t => t.id === tId);
        if (teacher) {
          await removeTeacherFromCenter(centerId, teacher.id, teacher.uid);
        }
      }
      setTeachers(prev => prev.filter(t => !selectedTeacherIds.includes(t.id)));
      setSelectedTeacherIds([]);
    } catch (err) {
      alert("O'qituvchilarni o'chirishda xatolik: " + err.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Ushbu kursni o\'chirishni tasdiqlaysizmi?')) return;
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

  const toggleSelectAllTeachers = () => {
    if (selectedTeacherIds.length === filteredTeachersWithStats.length) {
      setSelectedTeacherIds([]);
    } else {
      setSelectedTeacherIds(filteredTeachersWithStats.map(t => t.id));
    }
  };

  const toggleSelectOneTeacher = (id) => {
    setSelectedTeacherIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const getInitials = (name) => {
    if (!name) return 'O';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="center-admin-container">
      {/* 1. DASHBOARD VIEW */}
      {tab === 'dashboard' && (
        <div className="page-view-dashboard">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><Building size={16} /> O'quv Markazi Admin Panel</span>
              <h1>{centerName}</h1>
              <p>Markaz o'qituvchilari, xususiy so'z packlari va umumiy o'quv dasturi boshqaruvi.</p>
            </div>

            <div className="header-actions">
              <button className="btn-tab-action btn-add-teacher" onClick={() => setShowTeacherModal(true)}>
                <UserPlus size={18} /> O'qituvchi Qo'shish
              </button>
              <button className="btn-tab-action btn-add-pack" onClick={() => setShowPackEditor(true)}>
                <Sparkles size={18} /> Yangi Pack Yaratish
              </button>
            </div>
          </header>

          <div className="center-admin-stats">
            <div className="c-stat-card">
              <div className="c-stat-icon purple"><GraduationCap size={24} /></div>
              <div>
                <h3>{totalTeachers}</h3>
                <p>O'qituvchilar Soni</p>
              </div>
            </div>
            <div className="c-stat-card">
              <div className="c-stat-icon blue"><BookOpen size={24} /></div>
              <div>
                <h3>{totalCourses}</h3>
                <p>Xususiy Packlar</p>
              </div>
            </div>
            <div className="c-stat-card">
              <div className="c-stat-icon green"><Layers size={24} /></div>
              <div>
                <h3>Faol</h3>
                <p>Tizim Holati</p>
              </div>
            </div>
          </div>

          {/* Quick Previews */}
          <div className="dashboard-sections">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>O'qituvchilar ({teachers.length})</h2>
              <button className="btn-tab-action btn-add-teacher" style={{ padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => navigate('/corp/admin/teachers')}>
                Barchasini ko'rish <ArrowRight size={14} />
              </button>
            </div>

            <div className="teachers-grid" style={{ marginBottom: '2.5rem' }}>
              {teachers.slice(0, 3).map((teacher) => (
                <div key={teacher.id} className="teacher-card">
                  <div className="teacher-card-head">
                    <div className="teacher-avatar">{getInitials(teacher.name)}</div>
                    <div>
                      <h3>{teacher.name}</h3>
                      <span className="teacher-subject-badge">{teacher.subject || 'Ingliz tili'}</span>
                    </div>
                  </div>
                  <div className="teacher-card-info">
                    <p><strong>Email:</strong> {teacher.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', color: '#fff' }}>Custom So'z Packlari / Kurslar ({allCourses.length})</h2>
              <button className="btn-tab-action btn-add-pack" style={{ padding: '6px 12px', fontSize: '0.82rem' }} onClick={() => navigate('/corp/admin/courses')}>
                Barchasini ko'rish <ArrowRight size={14} />
              </button>
            </div>

            <div className="packs-grid">
              {allCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="custom-pack-card">
                  <div className="pack-level-tag">{course.title}</div>
                  <h3>{course.title}</h3>
                  <p className="pack-desc">{course.description || 'Izoh yo\'q'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. TEACHERS VIEW (Exact design matching user screenshot) */}
      {tab === 'teachers' && (
        <div className="teachers-page-container">
          {/* Top Bar */}
          <div className="teachers-top-bar">
            <div className="teachers-title-area">
              <h1>O'qituvchilar</h1>
              <p>{totalTeachers} ta o'qituvchi · {totalTeacherGroups} ta guruh · {totalTeacherStudents} ta o'quvchi</p>
            </div>

            <div className="teachers-top-actions">
              <div className="search-input-wrap">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Qidirish..." 
                  value={teacherSearchTerm}
                  onChange={e => setTeacherSearchTerm(e.target.value)}
                />
              </div>

              <button className="btn-add-teacher-primary" onClick={() => setShowTeacherModal(true)}>
                <Plus size={16} /> Qo'shish
              </button>
            </div>
          </div>

          {/* Teachers Data Table */}
          <div className="teachers-table-card">
            <table className="teachers-table">
              <thead>
                <tr>
                  <th>O'QITUVCHI</th>
                  <th>GURUHLAR</th>
                  <th>O'QUVCHILAR</th>
                  <th>STATUS</th>
                  <th style={{ width: '60px', textAlign: 'right' }}>AMAL</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachersWithStats.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div className="cell-teacher-info">
                        <div className="t-table-avatar">{getInitials(t.name)}</div>
                        <div className="t-table-details">
                          <span className="t-table-name">{t.name}</span>
                          <span className="t-table-email">{t.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BookOpen size={16} style={{ color: '#94a3b8' }} />
                        <span>{t.groupsCount}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={16} style={{ color: '#94a3b8' }} />
                        <span>{t.studentsCount}</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-pill-active">
                        <span className="status-dot"></span> Faol
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        className="btn-action-more"
                        title="Amallar"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#cbd5e1',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTeacherMenuPos({
                            top: rect.bottom + 6,
                            right: window.innerWidth - rect.right
                          });
                          setActiveTeacherMenu(activeTeacherMenu === t.id ? null : t.id);
                        }}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {activeTeacherMenu === t.id && (
                        <>
                          <div 
                            style={{ position: 'fixed', inset: 0, zIndex: 9998 }} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveTeacherMenu(null);
                            }} 
                          />
                          <div
                            className="teacher-action-dropdown"
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              position: 'fixed',
                              top: `${teacherMenuPos.top}px`,
                              right: `${teacherMenuPos.right}px`,
                              background: '#1a1a26',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              borderRadius: '12px',
                              padding: '6px',
                              zIndex: 9999,
                              boxShadow: '0 12px 30px rgba(0,0,0,0.7)',
                              minWidth: '140px'
                            }}
                          >
                            <button
                              type="button"
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '9px 12px',
                                borderRadius: '8px',
                                background: 'transparent',
                                border: 'none',
                                color: '#38bdf8',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background 0.15s ease',
                                marginBottom: '2px'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(56, 189, 248, 0.15)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTeacherMenu(null);
                                setResetPasswordTeacher(t);
                                setNewTeacherPassword('');
                              }}
                            >
                              <KeyRound size={16} /> Parolni yangilash
                            </button>

                            <button
                              type="button"
                              style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '9px 12px',
                                borderRadius: '8px',
                                background: 'transparent',
                                border: 'none',
                                color: '#f87171',
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'background 0.15s ease'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)'}
                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveTeacherMenu(null);
                                handleDeleteTeacher(t);
                              }}
                            >
                              <Trash2 size={16} /> O'chirish
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. COURSES VIEW */}
      {(tab === 'courses' || tab === 'packs') && (
        managingCourse ? (
          <CourseManager
            centerId={centerId}
            course={managingCourse}
            onBack={() => setSearchParams({})}
            onUpdate={(updated) => {
              setCustomPacks(prev => prev.map(p => p.id === updated.id ? updated : p));
            }}
          />
        ) : (
        <div className="courses-page-container">
          {/* Top Bar */}
          <div className="courses-top-bar">
            <div className="courses-title-area">
              <h1>Kurslar</h1>
              <p>{totalCourses} ta kurs · {totalSections} ta bo'lim · {totalWords} ta so'z</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-secondary"
                onClick={handleSeedBeginnerCourse}
                disabled={seedingCourse}
                title="Tayyor Beginner (A1) kursini bir tugma bilan to'liq yuklash — 3 oy, 15 mavzu, 332 so'z"
              >
                <Sparkles size={16} /> {seedingCourse ? 'Yuklanmoqda...' : 'Tayyor Beginner Kurs'}
              </button>
              <button
                className="btn-add-course-primary"
                onClick={() => { setEditingPack(null); setShowPackEditor(true); }}
              >
                <Plus size={16} /> Yangi Kurs
              </button>
            </div>
          </div>

          {/* 4 Summary Metrics Cards */}
          <div className="courses-metrics-grid">
            <div className="c-metric-card">
              <div className="c-metric-icon blue"><BookOpen size={20} /></div>
              <div className="c-metric-val">{totalCourses}</div>
              <div className="c-metric-label">Jami Kurslar</div>
            </div>

            <div className="c-metric-card">
              <div className="c-metric-icon purple"><Layers size={20} /></div>
              <div className="c-metric-val">{totalSections}</div>
              <div className="c-metric-label">Jami Bo'limlar</div>
            </div>

            <div className="c-metric-card">
              <div className="c-metric-icon green"><FileText size={20} /></div>
              <div className="c-metric-val">{totalWords}</div>
              <div className="c-metric-label">Jami So'zlar</div>
            </div>

            <div className="c-metric-card">
              <div className="c-metric-icon orange"><Users size={20} /></div>
              <div className="c-metric-val">{totalCourseStudents}</div>
              <div className="c-metric-label">O'quvchilar</div>
            </div>
          </div>

          {/* Toolbar (Search + Sort) */}
          <div className="courses-toolbar">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Kurs qidirish..."
                value={courseSearchTerm}
                onChange={e => setCourseSearchTerm(e.target.value)}
              />
            </div>

            <div className="sort-dropdown-wrap">
              <button
                className="btn-filter-dropdown"
                onClick={() => setShowCourseSortMenu(v => !v)}
              >
                <Filter size={16} /> Saralash <ChevronDown size={14} />
              </button>

              {showCourseSortMenu && (
                <div className="sort-dropdown-menu">
                  <div className="sort-dropdown-label">Saralash</div>
                  {[
                    { value: 'date', label: "Sana bo'yicha" },
                    { value: 'name', label: "Nom bo'yicha" },
                    { value: 'units', label: "Bo'limlar soni" },
                    { value: 'words', label: "So'zlar soni" },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setCourseSortOrder(courseSortBy === opt.value && courseSortOrder === 'desc' ? 'asc' : 'desc');
                        setCourseSortBy(opt.value);
                        setShowCourseSortMenu(false);
                      }}
                      className={`sort-dropdown-item ${courseSortBy === opt.value ? 'active' : ''}`}
                    >
                      {opt.label} {courseSortBy === opt.value && (courseSortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="courses-grid">
            {filteredCourses.map((c) => (
              <div key={c.id} className="course-card">
                <div className="course-card-top">
                  <div className="course-badge-icon">
                    <Book size={20} />
                  </div>
                  <div className="course-card-actions">
                    <button
                      onClick={() => {
                        const original = customPacks.find(p => p.id === c.id) || c;
                        setEditingPack(original);
                        setShowPackEditor(true);
                      }}
                      className="btn-card-action"
                      title="Tahrirlash"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(c.id)}
                      className="btn-card-action"
                      style={{ color: '#f87171' }}
                      title="O'chirish"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div className="course-card-content">
                  <h3>{c.title}</h3>
                  <p>{c.description || "Tavsif yo'q"}</p>
                </div>

                <div className="course-card-meta">
                  <div className="course-meta-row">
                    <div className="course-meta-item">
                      <Layers size={14} />
                      <span>{c.sectionsCount} bo'lim</span>
                    </div>
                    <div className="course-meta-item">
                      <FileText size={14} />
                      <span>{c.wordsCount} so'z</span>
                    </div>
                  </div>
                  <div className="course-meta-row" style={{ marginTop: '4px' }}>
                    <div className="course-meta-item">
                      <Users size={14} />
                      <span>{c.groupsCount} guruh</span>
                    </div>
                    <div className="course-meta-item">
                      <GraduationCap size={14} />
                      <span>{c.studentsCount} o'quvchi</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSearchParams({ courseId: c.id })}
                  className="btn-manage-course outline"
                >
                  Boshqarish <ArrowUpRight size={16} />
                </button>
              </div>
            ))}

            {/* Add-new card */}
            <button
              onClick={() => { setEditingPack(null); setShowPackEditor(true); }}
              className="course-card-add-new"
            >
              <div className="add-new-icon-wrap">
                <Plus size={24} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Yangi Kurs</span>
            </button>
          </div>

          {filteredCourses.length === 0 && (
            <div className="empty-state" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px dashed rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '3rem 1rem' }}>
              <div className="add-new-icon-wrap" style={{ width: '56px', height: '56px', borderRadius: '50%', marginBottom: '0.5rem' }}>
                <Search className="text-gray-500" size={24} />
              </div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '1rem', margin: 0 }}>
                {courseSearchTerm ? `"${courseSearchTerm}" bo'yicha kurs topilmadi` : "Hozircha kurslar yo'q"}
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Yangi kurs yaratish uchun tugmani bosing</p>
            </div>
          )}

          {/* Create/Edit modal */}
          {showPackEditor && (
            <div className="modal-overlay" onClick={() => { setShowPackEditor(false); setEditingPack(null); }}>
              <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '480px', padding: '1rem' }}>
                <CustomPackEditor
                  centerId={centerId}
                  editPack={editingPack}
                  onSaved={(pack) => {
                    setCustomPacks(prev => {
                      const exists = prev.some(p => p.id === pack.id);
                      if (exists) {
                        return prev.map(p => p.id === pack.id ? { ...p, ...pack } : p);
                      }
                      return [pack, ...prev];
                    });
                    setShowPackEditor(false);
                    setEditingPack(null);
                  }}
                  onCancel={() => { setShowPackEditor(false); setEditingPack(null); }}
                />
              </div>
            </div>
          )}
        </div>
        )
      )}

      {/* 4. STATISTICS VIEW */}
      {tab === 'statistics' && (
        <div className="page-view-statistics">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><BarChart3 size={16} /> Tahlil va Natijalar</span>
              <h1>Markaz Statistikasi</h1>
              <p>O'quvchilar faoliyati, bajarilgan mashqlar va haftalik ko'rsatkichlar.</p>
            </div>
          </header>

          <div className="stats-detail-grid">
            <div className="stat-detail-item">
              <span>Jami Biriktirilgan O'quvchilar</span>
              <strong>{totalCourseStudents} ta</strong>
            </div>
            <div className="stat-detail-item">
              <span>Jami O'qituvchilar</span>
              <strong>{totalTeachers} ta</strong>
            </div>
            <div className="stat-detail-item">
              <span>Jami Guruhlar</span>
              <strong>{groups.length} ta</strong>
            </div>
            <div className="stat-detail-item">
              <span>Jami Kurslar</span>
              <strong>{totalCourses} ta</strong>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '0.85rem', marginTop: '1rem' }}>
            Mashqlar soni, o'rtacha o'zlashtirish balli va faollik dinamikasi bo'yicha kuzatuv hali ishga tushirilmagan.
          </p>
        </div>
      )}

      {/* 5. SETTINGS VIEW */}
      {tab === 'settings' && (
        <div className="page-view-settings">
          <header className="center-admin-header">
            <div className="header-meta">
              <span className="center-badge"><Settings size={16} /> Sozlamalar</span>
              <h1>Markaz Sozlamalari</h1>
              <p>Markaz nomi, aloqa ma'lumotlari va xavfsizlik sozlamalarini boshqarish.</p>
            </div>
          </header>

          <div className="admin-settings-card">
            <form className="settings-form" onSubmit={handleSaveSettings}>
              <div className="form-group">
                <label>O'quv Markazi Nomi</label>
                <input 
                  type="text" 
                  value={centerName} 
                  onChange={e => setCenterName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Rasmiy Email</label>
                <input 
                  type="email" 
                  value={centerEmail} 
                  onChange={e => setCenterEmail(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Telefon Raqam</label>
                <input 
                  type="text" 
                  value={centerPhone} 
                  onChange={e => setCenterPhone(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label>Manzil / Hudud</label>
                <input 
                  type="text" 
                  value={centerAddress} 
                  onChange={e => setCenterAddress(e.target.value)} 
                />
              </div>

              <button type="submit" className="btn-save-settings" disabled={savingSettings}>
                {settingsSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                {savingSettings ? 'Saqlanmoqda...' : (settingsSaved ? 'Saqlandi!' : 'Sozlamalarni Saqlash')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Teacher Modal */}
      {showTeacherModal && (
        <div className="modal-overlay" onClick={() => setShowTeacherModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><UserPlus size={20} /> Yangi O'qituvchi Qo'shish</h2>
            <form onSubmit={handleAddTeacher} autoComplete="off">
              <div className="form-group">
                <label>F.I.SH *</label>
                <input 
                  type="text" 
                  name="teacher_fullname"
                  autoComplete="off"
                  required 
                  placeholder="masalan: Abdulla Qodirov"
                  value={teacherForm.name}
                  onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  autoFocus
                />
              </div>

              <div className="form-group">
                <label>Telefon raqam *</label>
                <input 
                  type="tel" 
                  name="teacher_phone"
                  autoComplete="off"
                  required
                  placeholder="+998 90 123 45 67"
                  value={teacherForm.phone}
                  onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Parol *</label>
                <input 
                  type="password" 
                  name="teacher_password"
                  autoComplete="new-password"
                  required
                  placeholder="O'qituvchining kirish paroli"
                  value={teacherForm.password}
                  onChange={e => setTeacherForm({ ...teacherForm, password: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowTeacherModal(false)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingTeacher}>
                  {submittingTeacher ? 'Saqlanmoqda...' : 'O\'qituvchini Qo\'shish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {resetPasswordTeacher && (
        <div className="modal-overlay" onClick={() => setResetPasswordTeacher(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><KeyRound size={20} /> Parolni Yangilash</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              <strong>{resetPasswordTeacher.name}</strong> ({resetPasswordTeacher.phone || resetPasswordTeacher.email}) o'qituvchisi uchun yangi parol kiriting:
            </p>

            <form onSubmit={handleUpdateTeacherPassword} autoComplete="off">
              <div className="form-group">
                <label>Yangi Parol *</label>
                <input 
                  type="text" 
                  name="new_teacher_pwd"
                  autoComplete="off"
                  required
                  placeholder="Kamida 6 ta belgi kiriting..."
                  value={newTeacherPassword}
                  onChange={e => setNewTeacherPassword(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setResetPasswordTeacher(null)}>Bekor qilish</button>
                <button type="submit" className="btn-primary" disabled={submittingPasswordReset}>
                  {submittingPasswordReset ? 'Saqlanmoqda...' : 'Parolni Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {credentials && (
        <CredentialsModal
          title="O'qituvchi Akkaunti Ma'lumotlari"
          email={credentials.email}
          tempPassword={credentials.tempPassword}
          onClose={() => setCredentials(null)}
        />
      )}
    </div>
  );
}
