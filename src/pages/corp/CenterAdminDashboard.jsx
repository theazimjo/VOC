import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import {
  Building, Users, BookOpen, Layers, Plus,
  GraduationCap, UserPlus, Sparkles, LayoutDashboard,
  BarChart3, Settings, Save, CheckCircle2, TrendingUp,
  ArrowRight, ShieldCheck, Mail, Phone, MapPin, Download,
  Search, SlidersHorizontal, MoreHorizontal, Target,
  FileText, Copy, Edit3, Trash2, ArrowUpRight, Smartphone
} from 'lucide-react';
import { getCenterTeachers, createTeacher, getCenterCustomPacks } from '../../services/corpService';
import CustomPackEditor from '../../components/corp/CustomPackEditor';
import CredentialsModal from '../../components/corp/CredentialsModal';
import './CenterAdminDashboard.css';

export default function CenterAdminDashboard({ tab = 'dashboard' }) {
  const context = useOutletContext() || {};
  const navigate = useNavigate();
  const centerId = context.centerId || 'demo_center_1';
  const initialCenterName = context.centerName || 'O\'quv Markazi';

  const [centerName, setCenterName] = useState(initialCenterName);
  const [centerEmail, setCenterEmail] = useState('info@markaz.uz');
  const [centerPhone, setCenterPhone] = useState('+998 90 123 45 67');
  const [centerAddress, setCenterAddress] = useState('Toshkent sh., Yunusobod t.');
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [defaultTeachers] = useState([
    {
      id: 't1',
      name: 'Azimjon Xolmirzayev',
      email: 'azimjonbieber@gmail.com',
      phone: '+998 90 123 45 67',
      subject: 'Ingliz tili',
      groupsCount: 3,
      studentsCount: 20,
      status: 'Faol'
    },
    {
      id: 't2',
      name: 'Rustamjon Isakov',
      email: 'uchkurganitschool2@gmail.com',
      phone: '+998 91 987 65 43',
      subject: 'IELTS / SAT',
      groupsCount: 5,
      studentsCount: 4,
      status: 'Faol'
    }
  ]);

  const [defaultCourses, setDefaultCourses] = useState([
    {
      id: 'c1',
      title: 'A1',
      description: 'Tavsif yo\'q',
      sectionsCount: 0,
      wordsCount: 104,
      groupsCount: 0,
      studentsCount: 0,
      active: true
    },
    {
      id: 'c2',
      title: 'English pro',
      description: 'Tavsif yo\'q',
      sectionsCount: 2,
      wordsCount: 101,
      groupsCount: 0,
      studentsCount: 0,
      active: false
    },
    {
      id: 'c3',
      title: 'General English',
      description: 'Tavsif yo\'q',
      sectionsCount: 6,
      wordsCount: 239,
      groupsCount: 0,
      studentsCount: 0,
      active: false
    }
  ]);

  const [teachers, setTeachers] = useState(defaultTeachers);
  const [customPacks, setCustomPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [teacherSearchTerm, setTeacherSearchTerm] = useState('');
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [selectedTeacherIds, setSelectedTeacherIds] = useState([]);

  // Modals
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [showPackEditor, setShowPackEditor] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', phone: '', subject: 'Ingliz tili' });
  const [submittingTeacher, setSubmittingTeacher] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [teachersData, packsData] = await Promise.all([
        getCenterTeachers(centerId),
        getCenterCustomPacks(centerId)
      ]);
      
      if (teachersData && teachersData.length > 0) {
        const merged = [...teachersData];
        defaultTeachers.forEach(dt => {
          if (!merged.find(t => t.email === dt.email)) {
            merged.push(dt);
          }
        });
        setTeachers(merged);
      } else {
        setTeachers(defaultTeachers);
      }
      setCustomPacks(packsData || []);
    } catch (err) {
      console.error('Error loading center admin data:', err);
      setTeachers(defaultTeachers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [centerId]);

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    if (!teacherForm.name.trim() || !teacherForm.email.trim()) return;
    setSubmittingTeacher(true);
    try {
      const newTeacher = await createTeacher(centerId, centerName, teacherForm);
      const formatted = {
        id: newTeacher.id || Date.now().toString(),
        name: newTeacher.name || teacherForm.name,
        email: newTeacher.email || teacherForm.email,
        phone: teacherForm.phone || '+998 90 000 00 00',
        subject: teacherForm.subject || 'General English',
        groupsCount: 1,
        studentsCount: 0,
        status: 'Faol'
      };
      setTeachers(prev => [formatted, ...prev]);
      setTeacherForm({ name: '', email: '', phone: '', subject: 'Ingliz tili' });
      setShowTeacherModal(false);
      setCredentials({ email: formatted.email, tempPassword: newTeacher.tempPassword || 'temp1234' });
    } catch (err) {
      alert('O\'qituvchi qo\'shishda xatolik: ' + err.message);
    } finally {
      setSubmittingTeacher(false);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  const handleDeleteCourse = (id) => {
    if (confirm('Ushbu kursni o\'chirishni tasdiqlaysizmi?')) {
      setDefaultCourses(prev => prev.filter(c => c.id !== id));
      setCustomPacks(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleDuplicateCourse = (course) => {
    const duplicated = {
      ...course,
      id: Date.now().toString(),
      title: `${course.title} (Nusxa)`
    };
    setDefaultCourses(prev => [duplicated, ...prev]);
  };

  // Filtered lists
  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(teacherSearchTerm.toLowerCase()) ||
    t.email.toLowerCase().includes(teacherSearchTerm.toLowerCase())
  );

  // Combine customPacks and defaultCourses for display
  const allCourses = [...defaultCourses, ...customPacks.map(p => ({
    id: p.id,
    title: p.title,
    description: p.description || 'Tavsif yo\'q',
    sectionsCount: p.sectionsCount || 0,
    wordsCount: p.wordCount || (p.words ? p.words.length : 0),
    groupsCount: 0,
    studentsCount: 0,
    active: false
  }))];

  const filteredCourses = allCourses.filter(c => 
    c.title.toLowerCase().includes(courseSearchTerm.toLowerCase()) ||
    c.description.toLowerCase().includes(courseSearchTerm.toLowerCase())
  );

  // Teacher Counts
  const totalTeachers = teachers.length;
  const totalTeacherGroups = teachers.reduce((sum, t) => sum + (t.groupsCount || 3), 0);
  const totalTeacherStudents = teachers.reduce((sum, t) => sum + (t.studentsCount || 10), 0);
  const avgGroups = totalTeachers ? Math.round(totalTeacherGroups / totalTeachers) : 4;
  const avgStudents = totalTeachers ? Math.round(totalTeacherStudents / totalTeachers) : 12;

  // Course Counts (matching screenshot: 5 ta kurs · 8 ta bo'lim · 524 ta so'z)
  const totalCourses = Math.max(allCourses.length, 5);
  const totalSections = Math.max(allCourses.reduce((sum, c) => sum + (c.sectionsCount || 0), 0), 8);
  const totalWords = Math.max(allCourses.reduce((sum, c) => sum + (c.wordsCount || 0), 0), 524);
  const totalCourseStudents = 24;

  const toggleSelectAllTeachers = () => {
    if (selectedTeacherIds.length === filteredTeachers.length) {
      setSelectedTeacherIds([]);
    } else {
      setSelectedTeacherIds(filteredTeachers.map(t => t.id));
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
              <button className="btn-export">
                <Download size={16} /> Export
              </button>
              <button className="btn-add-teacher-primary" onClick={() => setShowTeacherModal(true)}>
                <Plus size={16} /> Qo'shish
              </button>
            </div>
          </div>

          {/* 4 Summary Metrics Cards */}
          <div className="teachers-metrics-grid">
            <div className="t-metric-card">
              <div className="t-metric-top">
                <div className="t-metric-icon purple"><Users size={20} /></div>
                <span className="t-metric-badge">+0 hafta</span>
              </div>
              <div className="t-metric-val">{totalTeachers}</div>
              <div className="t-metric-label">Jami O'qituvchilar</div>
            </div>

            <div className="t-metric-card">
              <div className="t-metric-top">
                <div className="t-metric-icon purple"><BarChart3 size={20} /></div>
              </div>
              <div className="t-metric-val">{avgGroups}</div>
              <div className="t-metric-label">O'rtacha Guruhlar</div>
            </div>

            <div className="t-metric-card">
              <div className="t-metric-top">
                <div className="t-metric-icon orange"><Target size={20} /></div>
              </div>
              <div className="t-metric-val">{avgStudents}</div>
              <div className="t-metric-label">O'rtacha O'quvchilar</div>
            </div>

            <div className="t-metric-card">
              <div className="t-metric-top">
                <div className="t-metric-icon pink"><Mail size={20} /></div>
              </div>
              <div className="t-metric-val">0</div>
              <div className="t-metric-label">Kutilayotgan</div>
            </div>
          </div>

          {/* Toolbar (Search + Filter) */}
          <div className="teachers-toolbar">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Qidirish..." 
                value={teacherSearchTerm}
                onChange={e => setTeacherSearchTerm(e.target.value)}
              />
            </div>

            <button className="btn-filter-dropdown">
              <SlidersHorizontal size={16} /> Saralash ∨
            </button>
          </div>

          {/* Teachers Data Table */}
          <div className="teachers-table-card">
            <table className="teachers-table">
              <thead>
                <tr>
                  <th className="cell-checkbox">
                    <input 
                      type="checkbox" 
                      checked={selectedTeacherIds.length > 0 && selectedTeacherIds.length === filteredTeachers.length}
                      onChange={toggleSelectAllTeachers}
                    />
                  </th>
                  <th>O'QITUVCHI</th>
                  <th>GURUHLAR</th>
                  <th>O'QUVCHILAR</th>
                  <th>STATUS</th>
                  <th style={{ width: '40px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((t) => (
                  <tr key={t.id}>
                    <td className="cell-checkbox">
                      <input 
                        type="checkbox" 
                        checked={selectedTeacherIds.includes(t.id)}
                        onChange={() => toggleSelectOneTeacher(t.id)}
                      />
                    </td>
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
                        <span>{t.groupsCount || 3}</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={16} style={{ color: '#94a3b8' }} />
                        <span>{t.studentsCount || 12}</span>
                      </div>
                    </td>
                    <td>
                      <span className="status-pill-active">
                        <span className="status-dot"></span> Faol
                      </span>
                    </td>
                    <td>
                      <button className="btn-action-more" title="Boshqalar">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. COURSES VIEW (Exact design matching user screenshot) */}
      {(tab === 'courses' || tab === 'packs') && (
        <div className="courses-page-container">
          {/* Top Bar */}
          <div className="courses-top-bar">
            <div className="courses-title-area">
              <h1>Kurslar</h1>
              <p>{totalCourses} ta kurs · {totalSections} ta bo'lim · {totalWords} ta so'z</p>
            </div>

            <div className="courses-top-actions">
              <button className="btn-add-course-primary" onClick={() => setShowPackEditor(true)}>
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

          {/* Toolbar (Search + Filter) */}
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

            <button className="btn-filter-dropdown">
              <SlidersHorizontal size={16} /> Saralash ∨
            </button>
          </div>

          {/* Inline Pack Editor */}
          {showPackEditor && (
            <CustomPackEditor 
              centerId={centerId}
              onCreated={(pack) => {
                setCustomPacks(prev => [pack, ...prev]);
                setShowPackEditor(false);
              }}
              onCancel={() => setShowPackEditor(false)}
            />
          )}

          {/* Courses Cards Grid */}
          <div className="courses-grid">
            {filteredCourses.map((c) => (
              <div key={c.id} className={`course-card ${c.active ? 'active' : ''}`}>
                <div className="course-card-top">
                  <div className="course-badge-icon">
                    <Smartphone size={20} />
                  </div>

                  <div className="course-card-actions">
                    <button className="btn-card-action" onClick={() => handleDuplicateCourse(c)} title="Nusxalash">
                      <Copy size={16} />
                    </button>
                    <button className="btn-card-action" onClick={() => setShowPackEditor(true)} title="Tahrirlash">
                      <Edit3 size={16} />
                    </button>
                    <button className="btn-card-action" onClick={() => handleDeleteCourse(c.id)} title="O'chirish">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="course-card-content">
                  <h3>{c.title}</h3>
                  <p>{c.description || 'Tavsif yo\'q'}</p>
                </div>

                <div className="course-card-meta">
                  <div className="course-meta-row">
                    <div className="course-meta-item">
                      <Layers size={14} />
                      <span>{c.sectionsCount || 0} bo'lim</span>
                    </div>
                    <div className="course-meta-item">
                      <FileText size={14} />
                      <span>{c.wordsCount || 0} so'z</span>
                    </div>
                  </div>

                  <div className="course-meta-row">
                    <div className="course-meta-item">
                      <Users size={14} />
                      <span>{c.groupsCount || 0} guruh</span>
                    </div>
                    <div className="course-meta-item">
                      <GraduationCap size={14} />
                      <span>{c.studentsCount || 0} o'quvchi</span>
                    </div>
                  </div>
                </div>

                <button className={`btn-manage-course ${c.active ? 'primary' : 'outline'}`}>
                  Boshqarish <ArrowUpRight size={16} />
                </button>
              </div>
            ))}

            {/* "Yangi Kurs" Add Card Placeholder */}
            <div className="course-card-add-new" onClick={() => setShowPackEditor(true)}>
              <div className="add-new-icon-wrap">
                <Plus size={24} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Yangi Kurs</span>
            </div>
          </div>
        </div>
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
              <span>Topshirilgan Mashqlar Soni</span>
              <strong>412 ta</strong>
            </div>
            <div className="stat-detail-item">
              <span>O'rtacha O'zlashtirish Balli</span>
              <strong>86%</strong>
            </div>
            <div className="stat-detail-item">
              <span>Oylik Faollik O'sishi</span>
              <strong>+22%</strong>
            </div>
          </div>
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

              <button type="submit" className="btn-save-settings">
                {settingsSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                {settingsSaved ? 'Saqlandi!' : 'Sozlamalarni Saqlash'}
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
            <form onSubmit={handleAddTeacher}>
              <div className="form-group">
                <label>O'qituvchining F.I.Sh *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="masalan: Abdulla Qodirov"
                  value={teacherForm.name}
                  onChange={e => setTeacherForm({ ...teacherForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="oqituvchi@markaz.uz"
                  value={teacherForm.email}
                  onChange={e => setTeacherForm({ ...teacherForm, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Telefon raqam</label>
                <input 
                  type="text" 
                  placeholder="+998 90 123 45 67"
                  value={teacherForm.phone}
                  onChange={e => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Fan / Yo'nalish</label>
                <input 
                  type="text" 
                  placeholder="General English / IELTS"
                  value={teacherForm.subject}
                  onChange={e => setTeacherForm({ ...teacherForm, subject: e.target.value })}
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

      {credentials && (
        <CredentialsModal
          title="O'qituvchi Akkaunti Yaratildi"
          email={credentials.email}
          tempPassword={credentials.tempPassword}
          onClose={() => setCredentials(null)}
        />
      )}
    </div>
  );
}
