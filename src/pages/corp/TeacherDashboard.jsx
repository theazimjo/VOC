import { useState, useEffect } from 'react';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import {
  Users, Plus, BookOpen, Key, ArrowRightLeft,
  Eye, Copy, Check, Sparkles, Trash2,
  Archive, RotateCcw, BarChart3, Settings, Search,
  Save, CheckCircle2, TrendingUp, Shield, ArrowLeft, ChevronRight, X, ChevronDown, MoreVertical, Moon, Sun
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import {
  getTeacherGroups, createGroup, getCenterCustomPacks,
  assignPackToGroup, getGroupStudents, duplicateCustomPack, deleteCustomPack,
  updateGroupStatus, updateTeacherPassword, updateGroupDetails, deleteGroup
} from '../../services/corpService';
import TransferGroupModal from '../../components/corp/TransferGroupModal';
import CustomPackEditor from '../../components/corp/CustomPackEditor';
import TeacherPackViewer from '../../components/corp/TeacherPackViewer';
import './TeacherDashboard.css';
import './CenterAdminDashboard.css';

export default function TeacherDashboard({ tab = 'groups' }) {
  const context = useOutletContext() || {};
  const { theme, setTheme } = useTheme();
  const { centerId, teacherId, teacherName, phone, email } = context;
  const { groupId: urlGroupId, subTab = 'students' } = useParams();
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [customPacks, setCustomPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPackEditor, setShowPackEditor] = useState(false);
  const [transferingGroup, setTransferingGroup] = useState(null);
  const [viewingGroupStudents, setViewingGroupStudents] = useState(null);
  const [groupStudentsList, setGroupStudentsList] = useState([]);
  const [assigningGroup, setAssigningGroup] = useState(null);
  const [duplicatingPackId, setDuplicatingPackId] = useState(null);
  const [viewingPack, setViewingPack] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(urlGroupId || null);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);

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
      const [groupsData, packsData] = await Promise.all([
        getTeacherGroups(centerId, teacherId),
        getCenterCustomPacks(centerId)
      ]);
      setGroups(groupsData || []);
      setCustomPacks(packsData || []);
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

  const handleDeleteGroup = async (group) => {
    if (!confirm(`"${group.name}" guruhini butunlay o'chirmoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi!`)) return;
    try {
      await deleteGroup(centerId, group.id);
      setGroups(prev => prev.filter(g => g.id !== group.id));
      setSelectedGroupId(null);
      navigate('/corp/teacher');
      alert("Guruh muvaffaqiyatli o'chirildi!");
    } catch (err) {
      alert("Guruhni o'chirishda xatolik: " + err.message);
    }
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

  const handleAssignPack = async (groupId, packId) => {
    try {
      const updatedPacks = await assignPackToGroup(centerId, groupId, packId);
      setGroups(prev => prev.map(g => g.id === groupId ? { ...g, assignedPacks: updatedPacks } : g));
      alert('So\'z packi guruhga muvaffaqiyatli biriktirildi!');
      setAssigningGroup(null);
    } catch (err) {
      alert('Biriktirishda xatolik: ' + err.message);
    }
  };

  const handleDuplicatePack = async (pack) => {
    setDuplicatingPackId(pack.id);
    try {
      const copy = await duplicateCustomPack(centerId, pack);
      setCustomPacks(prev => [copy, ...prev]);
    } catch (err) {
      alert('Pack nusxalashda xatolik: ' + err.message);
    } finally {
      setDuplicatingPackId(null);
    }
  };

  const handleDeletePack = async (pack) => {
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
    setSavingSettings(true);
    setSettingsSuccess('');
    try {
      if (profileForm.password.trim()) {
        if (profileForm.password.trim().length < 6) {
          alert("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak!");
          setSavingSettings(false);
          return;
        }
        await updateTeacherPassword(centerId, teacherId, teacherId, profileForm.password.trim());
      }
      setSettingsSuccess('Profil sozlamalari muvaffaqiyatli saqlandi!');
      setTimeout(() => setSettingsSuccess(''), 3000);
    } catch (err) {
      alert('Sozlamalarni saqlashda xatolik: ' + err.message);
    } finally {
      setSavingSettings(false);
    }
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

  return (
    <div className="teacher-dashboard-container">
      {/* 1. GURUHLARIM TAB */}
      {tab === 'groups' && (
        selectedGroup ? (
          <div className="tpv-container">
            {/* Header with Title and Actions on the Right */}
            <div className="tpv-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button type="button" className="tpv-back" onClick={() => { setSelectedGroupId(null); navigate('/corp/teacher'); }} style={{ flexShrink: 0 }}>
                  <ArrowLeft size={18} />
                </button>
                <div className="tpv-title">
                  <h2 style={{ margin: 0, fontSize: '1.45rem', color: '#fff', fontWeight: 700 }}>{selectedGroup.name}</h2>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    {selectedGroup.level} · {selectedGroup.studentsCount || 0} ta o'quvchi · {(selectedGroup.assignedPacks || []).length} ta pack
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                {/* PIN Code Pill */}
                <div className="group-code-pill" onClick={() => copyCode(selectedGroup.code)} title="Nusxalash uchun bosing" style={{ margin: 0, height: '36px', display: 'flex', alignItems: 'center' }}>
                  <Key size={14} /> PIN: <strong>{selectedGroup.code}</strong>
                  {copiedCode === selectedGroup.code ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                </div>                {/* Actions Dropdown */}
                <div style={{ position: 'relative', zIndex: 100 }}>
                  <button
                    onClick={() => setShowActionsDropdown(!showActionsDropdown)}
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      flex: 'none',
                      transition: 'background 0.2s'
                    }}
                    title="Batafsil harakatlar"
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {showActionsDropdown && (
                    <>
                      {/* Invisible backdrop to close dropdown on click outside */}
                      <div
                        onClick={() => setShowActionsDropdown(false)}
                        style={{
                          position: 'fixed',
                          inset: 0,
                          zIndex: 10,
                          background: 'transparent'
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 6px)',
                          right: 0,
                          width: '180px',
                          background: '#16161f',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          padding: '6px',
                          zIndex: 20,
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}
                      >
                        <button
                          onClick={() => {
                            setShowActionsDropdown(false);
                            handleOpenEditModal(selectedGroup);
                          }}
                          style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: '#cbd5e1',
                            padding: '8px 10px',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <Settings size={14} /> Guruhni tahrirlash
                        </button>

                        <button
                          onClick={() => {
                            setShowActionsDropdown(false);
                            setTransferingGroup(selectedGroup);
                          }}
                          style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: '#cbd5e1',
                            padding: '8px 10px',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <ArrowRightLeft size={14} /> Guruhni o'tkazish
                        </button>

                        <button
                          onClick={() => {
                            setShowActionsDropdown(false);
                            handleArchiveGroup(selectedGroup);
                          }}
                          style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: '#fbbf24',
                            padding: '8px 10px',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.1)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <Archive size={14} /> Guruhni arxivlash
                        </button>

                        <button
                          onClick={() => {
                            setShowActionsDropdown(false);
                            handleDeleteGroup(selectedGroup);
                          }}
                          style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: '#f87171',
                            padding: '8px 10px',
                            textAlign: 'left',
                            fontSize: '0.85rem',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.1)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'none'}
                        >
                          <Trash2 size={14} /> Guruhni o'chirish
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Bar Navigation */}
            <div className="group-tabs-bar" style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem', marginTop: '1.25rem', gap: '1.75rem' }}>
              <button
                className={`group-tab-btn ${subTab === 'students' ? 'active' : ''}`}
                onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/students`)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: subTab === 'students' ? '2px solid #3b82f6' : '2px solid transparent',
                  color: subTab === 'students' ? '#fff' : '#94a3b8',
                  padding: '10px 0',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                O'quvchilar ({selectedGroup.studentsCount || 0})
              </button>
              <button
                className={`group-tab-btn ${subTab === 'words' ? 'active' : ''}`}
                onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/words`)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: subTab === 'words' ? '2px solid #3b82f6' : '2px solid transparent',
                  color: subTab === 'words' ? '#fff' : '#94a3b8',
                  padding: '10px 0',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                So'zlar / Packlar ({(selectedGroup.assignedPacks || []).length})
              </button>
              <button
                className={`group-tab-btn ${subTab === 'stats' ? 'active' : ''}`}
                onClick={() => navigate(`/corp/teacher/group/${selectedGroup.id}/stats`)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: subTab === 'stats' ? '2px solid #3b82f6' : '2px solid transparent',
                  color: subTab === 'stats' ? '#fff' : '#94a3b8',
                  padding: '10px 0',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                Statistika
              </button>
            </div>

            {/* Tab Contents */}
            <div className="group-tab-content">
              {/* SUB-TAB 1: STUDENTS */}
              {subTab === 'students' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {groupStudentsList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                      <Users size={36} style={{ marginBottom: '10px', color: '#64748b' }} />
                      <p style={{ margin: '0 0 8px 0' }}>Ushbu guruhga hali o'quvchilar ulanmagan.</p>
                      <span style={{ fontSize: '0.85rem' }}>O'quvchilarga 6 xonali ulanish kodini bering: <strong>{selectedGroup.code}</strong></span>
                    </div>
                  ) : (
                    <div className="students-progress-list" style={{ marginTop: 0 }}>
                      {groupStudentsList.map((st, i) => (
                        <div key={st.id || i} className="student-progress-row" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                          <div className="st-info">
                            <div className="st-avatar" style={{ background: '#3b82f6', fontWeight: 700 }}>{st.name.charAt(0).toUpperCase()}</div>
                            <div>
                              <strong style={{ color: '#fff' }}>{st.name}</strong>
                              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{st.email || 'Email kiritilmagan'}</div>
                            </div>
                          </div>

                          <div className="st-stats">
                            <span className="badge-active">A'zo bo'ldi</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 2: WORDS / PACKS */}
              {subTab === 'words' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', color: '#fff', margin: 0, fontWeight: 600 }}>Guruhga biriktirilgan so'z packlari</h3>
                    <button
                      className="btn-add-course-primary"
                      onClick={() => setAssigningGroup(selectedGroup)}
                      style={{ padding: '8px 14px', fontSize: '0.85rem', height: '36px' }}
                    >
                      <Plus size={16} /> Pack Biriktirish
                    </button>
                  </div>

                  {(selectedGroup.assignedPacks || []).length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                      <BookOpen size={36} style={{ marginBottom: '10px', color: '#64748b' }} />
                      <p style={{ margin: 0 }}>Guruhga hali birorta so'z packi biriktirilmagan.</p>
                    </div>
                  ) : (
                    <div className="tpv-list" style={{ marginTop: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {selectedGroup.assignedPacks.map(pid => {
                        const p = customPacks.find(cp => cp.id === pid);
                        if (!p) return null;
                        return (
                          <div key={pid} className="tpv-row" style={{ cursor: 'default', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span className="tpv-row-label" style={{ color: '#fff', fontWeight: 600 }}>{p.title}</span>
                            <span className="tpv-row-meta" style={{ color: '#94a3b8', fontSize: '0.88rem' }}>{p.wordCount || (p.words ? p.words.length : 0)} ta so'z</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* SUB-TAB 3: STATISTICS */}
              {subTab === 'stats' && (
                <div className="group-stats-tab" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.25rem' }}>
                      <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px' }}>O'quvchilar soni</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{selectedGroup.studentsCount || 0} ta</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.25rem' }}>
                      <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '6px' }}>Biriktirilgan packlar</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{(selectedGroup.assignedPacks || []).length} ta</div>
                    </div>
                  </div>

                  <div className="teachers-table-card" style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <h4 style={{ padding: '1rem 1.25rem', margin: 0, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '0.98rem', fontWeight: 600 }}>
                      O'quvchilar o'zlashtirishi (Packlar bo'yicha)
                    </h4>
                    {groupStudentsList.length === 0 ? (
                      <div style={{ padding: '2.5rem 1rem', textAlign: 'center', color: '#94a3b8' }}>
                        Statistika ko'rsatish uchun guruhda o'quvchilar mavjud emas.
                      </div>
                    ) : (
                      <div style={{ overflowX: 'auto' }}>
                        <table className="teachers-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              <th style={{ padding: '12px 16px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>O'quvchi</th>
                              <th style={{ padding: '12px 16px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>So'z Packi</th>
                              <th style={{ padding: '12px 16px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>O'zlashtirilgan so'z</th>
                              <th style={{ padding: '12px 16px', fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>So'nggi faollik</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupStudentsList.flatMap((student) => {
                              const packs = selectedGroup.assignedPacks || [];
                              if (packs.length === 0) {
                                return (
                                  <tr key={student.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    <td style={{ padding: '14px 16px', color: '#fff', fontWeight: 600 }}>{student.name}</td>
                                    <td colSpan="3" style={{ padding: '14px 16px', color: '#64748b', fontStyle: 'italic' }}>Biriktirilgan packlar yo'q</td>
                                  </tr>
                                );
                              }
                              return packs.map((pid, idx) => {
                                const p = customPacks.find(cp => cp.id === pid);
                                const packName = p ? p.title : 'Noma\'lum pack';
                                const totalWords = p ? (p.wordCount || (p.words ? p.words.length : 0)) : 0;
                                const prog = (student.progress || {})[pid] || { wordsLearned: 0, lastActivity: '-' };
                                const percent = totalWords > 0 ? Math.round((prog.wordsLearned / totalWords) * 100) : 0;

                                return (
                                  <tr key={`${student.id}-${pid}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                                    {idx === 0 && (
                                      <td rowSpan={packs.length} style={{ padding: '14px 16px', color: '#fff', fontWeight: 600, verticalAlign: 'middle', borderRight: '1px solid rgba(255,255,255,0.04)' }}>
                                        {student.name}
                                      </td>
                                    )}
                                    <td style={{ padding: '14px 16px', color: '#cbd5e1' }}>{packName}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontWeight: 600, color: '#4ade80', minWidth: '45px' }}>{prog.wordsLearned} / {totalWords}</span>
                                        <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden', minWidth: '60px', maxWidth: '120px' }}>
                                          <div style={{ width: `${percent}%`, height: '100%', background: '#4ade80', borderRadius: '999px' }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{percent}%</span>
                                      </div>
                                    </td>
                                    <td style={{ padding: '14px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>
                                      {prog.lastActivity && prog.lastActivity !== '-' ? new Date(prog.lastActivity).toLocaleDateString() : '-'}
                                    </td>
                                  </tr>
                                );
                              });
                            })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
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
          <div className="courses-top-bar" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="courses-title-area">
              <h1>Guruhlarim</h1>
              <p>{activeGroups.length} ta faol guruh · {totalStudents} ta o'quvchi</p>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'nowrap' }}>
              <div className="search-input-wrap" style={{ width: '260px', position: 'relative' }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Guruh nomini qidirish..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{ width: '100%', paddingRight: searchTerm ? '32px' : '12px' }}
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0
                    }}
                    title="Qidiruvni tozalash"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <button className="btn-add-course-primary" onClick={() => setShowCreateModal(true)} style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                <Plus size={16} /> Yangi Guruh
              </button>
            </div>
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
              {filteredActiveGroups.map((group) => (
                <div
                  key={group.id}
                  className="teacher-group-card clickable"
                  onClick={() => {
                    setSelectedGroupId(group.id);
                    navigate(`/corp/teacher/group/${group.id}`);
                  }}
                >
                  <div className="group-card-header">
                    <div>
                      <span className="group-level-badge">{group.level}</span>
                      <h3>{group.name}</h3>
                    </div>

                    <div className="group-code-pill" onClick={(e) => { e.stopPropagation(); copyCode(group.code); }} title="Nusxalash uchun bosing">
                      <Key size={14} /> PIN: <strong>{group.code}</strong>
                      {copiedCode === group.code ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                    </div>
                  </div>

                  <div className="group-card-body">
                    <div className="group-info-row">
                      <Users size={16} /> <span>O'quvchilar: <strong>{group.studentsCount || 0} ta</strong></span>
                    </div>
                    <div className="group-info-row">
                      <BookOpen size={16} /> <span>Biriktirilgan packlar: <strong>{(group.assignedPacks || []).length} ta</strong></span>
                    </div>
                  </div>

                  <div className="group-card-footer">
                    <span>Batafsil ko'rish</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          )}
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
                      <BookOpen size={16} /> <span>Biriktirilgan packlar: <strong>{(group.assignedPacks || []).length} ta</strong></span>
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
        ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '1.35rem', color: '#fff', margin: 0, fontWeight: 700 }}>
              So'zlar bazasi ({customPacks.length})
            </h2>

            <div className="search-input-wrap" style={{ maxWidth: '280px', width: '100%' }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Pack nomini qidirish..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredPacks.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={40} />
              <p>{searchTerm ? 'Qidiruv bo\'yicha pack topilmadi.' : 'Hozircha custom packlar yaratilmagan.'}</p>
            </div>
          ) : (
            <div className="packs-grid">
              {filteredPacks.map((pack) => (
                <div
                  key={pack.id}
                  className="custom-pack-card"
                  onClick={() => setViewingPack(pack)}
                  style={{ cursor: 'pointer' }}
                  title="Ko'rish uchun bosing"
                >
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: '#1a1a26', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#6366f1" /> Jami Guruhlar
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{activeGroups.length} ta</div>
            </div>

            <div style={{ background: '#1a1a26', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="#4ade80" /> Jami O'quvchilar
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{totalStudents} ta</div>
            </div>

            <div style={{ background: '#1a1a26', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} color="#a855f7" /> Custom Packlar
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{customPacks.length} ta</div>
            </div>

            <div style={{ background: '#1a1a26', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '1.25rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="#38bdf8" /> O'rtacha O'zlashtirish
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#4ade80' }}>89%</div>
            </div>
          </div>

          <div className="teachers-table-card">
            <h3 style={{ padding: '1.25rem 1.5rem', margin: 0, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)', fontSize: '1.1rem' }}>
              Guruhlar Statistikasi
            </h3>
            <table className="teachers-table">
              <thead>
                <tr>
                  <th>GURUH NOMI</th>
                  <th>DARAJA</th>
                  <th>O'QUVCHILAR</th>
                  <th>PACKLAR</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {activeGroups.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>Hali guruhlar yo'q</td>
                  </tr>
                ) : (
                  activeGroups.map(g => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: 600, color: '#fff' }}>{g.name}</td>
                      <td><span className="group-level-badge">{g.level}</span></td>
                      <td>{g.studentsCount || 0} ta o'quvchi</td>
                      <td>{(g.assignedPacks || []).length} ta pack</td>
                      <td><span className="teacher-status-pill active">• Faol</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
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

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> Yangi Guruh Yaratish</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.88rem' }}>Guruh Nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Beginner Monday 17:00"
                  value={groupForm.name}
                  onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.88rem' }}>Daraja (Level)</label>
                <select
                  value={groupForm.level}
                  onChange={e => setGroupForm({ ...groupForm, level: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                   <option value="Beginner" style={{ background: '#1e1e2d', color: '#fff' }}>Beginner</option>
                  <option value="Elementary" style={{ background: '#1e1e2d', color: '#fff' }}>Elementary</option>
                  <option value="Pre-Intermediate" style={{ background: '#1e1e2d', color: '#fff' }}>Pre-Intermediate</option>
                  <option value="Intermediate" style={{ background: '#1e1e2d', color: '#fff' }}>Intermediate</option>
                  <option value="Upper-Intermediate" style={{ background: '#1e1e2d', color: '#fff' }}>Upper-Intermediate</option>
                  <option value="Advanced" style={{ background: '#1e1e2d', color: '#fff' }}>Advanced</option>
                  <option value="Pre-IELTS" style={{ background: '#1e1e2d', color: '#fff' }}>Pre-IELTS</option>
                  <option value="IELTS" style={{ background: '#1e1e2d', color: '#fff' }}>IELTS</option>
                  <option value="CEFR B1" style={{ background: '#1e1e2d', color: '#fff' }}>CEFR B1</option>
                  <option value="CEFR B2" style={{ background: '#1e1e2d', color: '#fff' }}>CEFR B2</option>
                  <option value="CEFR C1" style={{ background: '#1e1e2d', color: '#fff' }}>CEFR C1</option>
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
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.88rem' }}>Guruh Nomi *</label>
                <input
                  type="text"
                  required
                  placeholder="masalan: Beginner Monday 17:00"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#cbd5e1', fontSize: '0.88rem' }}>Daraja (Level)</label>
                <select
                  value={editForm.level}
                  onChange={e => setEditForm({ ...editForm, level: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="Beginner" style={{ background: '#1e1e2d', color: '#fff' }}>Beginner</option>
                  <option value="Elementary" style={{ background: '#1e1e2d', color: '#fff' }}>Elementary</option>
                  <option value="Pre-Intermediate" style={{ background: '#1e1e2d', color: '#fff' }}>Pre-Intermediate</option>
                  <option value="Intermediate" style={{ background: '#1e1e2d', color: '#fff' }}>Intermediate</option>
                  <option value="Upper-Intermediate" style={{ background: '#1e1e2d', color: '#fff' }}>Upper-Intermediate</option>
                  <option value="Advanced" style={{ background: '#1e1e2d', color: '#fff' }}>Advanced</option>
                  <option value="Pre-IELTS" style={{ background: '#1e1e2d', color: '#fff' }}>Pre-IELTS</option>
                  <option value="IELTS" style={{ background: '#1e1e2d', color: '#fff' }}>IELTS</option>
                  <option value="CEFR B1" style={{ background: '#1e1e2d', color: '#fff' }}>CEFR B1</option>
                  <option value="CEFR B2" style={{ background: '#1e1e2d', color: '#fff' }}>CEFR B2</option>
                  <option value="CEFR C1" style={{ background: '#1e1e2d', color: '#fff' }}>CEFR C1</option>
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

      {/* Assign Pack Modal */}
      {assigningGroup && (
        <div className="modal-overlay" onClick={() => setAssigningGroup(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><BookOpen size={20} /> Pack Biriktirish: {assigningGroup.name}</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Ushbu guruh o'quvchilari o'rganishi uchun pack tanlang:
            </p>

            <div className="assign-pack-list">
              <h4>Markaz Xususiy Packlari ({customPacks.length})</h4>
              {customPacks.length === 0 ? (
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Markaz custom packlari hali yaratilmagan.</p>
              ) : (
                customPacks.map(p => (
                  <div key={p.id} className="assign-pack-item">
                    <div>
                      <strong>{p.title}</strong> ({p.level}) - {p.wordCount || (p.words ? p.words.length : 0)} so'z
                    </div>
                    <button
                      className="btn-select-pack"
                      onClick={() => handleAssignPack(assigningGroup.id, p.id)}
                      disabled={(assigningGroup.assignedPacks || []).includes(p.id)}
                    >
                      {(assigningGroup.assignedPacks || []).includes(p.id) ? 'Biriktirilgan' : 'Biriktirish'}
                    </button>
                  </div>
                ))
              )}
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
              <div style={{ textAlign: 'center', padding: '2rem 0', color: '#94a3b8' }}>
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
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{st.email || 'Email berilmagan'}</div>
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

      {/* Transfer Group Modal */}
      {transferingGroup && (
        <TransferGroupModal
          centerId={centerId}
          currentTeacherId={teacherId}
          group={transferingGroup}
          onTransferred={(gId) => {
            setGroups(prev => prev.filter(g => g.id !== gId));
            setTransferingGroup(null);
          }}
          onClose={() => setTransferingGroup(null)}
        />
      )}
    </div>
  );
}
