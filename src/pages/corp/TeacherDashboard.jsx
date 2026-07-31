import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Users, Plus, BookOpen, Key, ArrowRightLeft,
  Eye, Copy, Check, Award, Sparkles, Trash2
} from 'lucide-react';
import {
  getTeacherGroups, createGroup, getCenterCustomPacks,
  assignPackToGroup, getGroupStudents, duplicateCustomPack, deleteCustomPack
} from '../../services/corpService';
import TransferGroupModal from '../../components/corp/TransferGroupModal';
import CustomPackEditor from '../../components/corp/CustomPackEditor';
import './TeacherDashboard.css';
import './CenterAdminDashboard.css';

export default function TeacherDashboard() {
  const { centerId, teacherId, teacherName } = useOutletContext();

  const [groups, setGroups] = useState([]);
  const [customPacks, setCustomPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPackEditor, setShowPackEditor] = useState(false);
  const [transferingGroup, setTransferingGroup] = useState(null);
  const [viewingGroupStudents, setViewingGroupStudents] = useState(null);
  const [groupStudentsList, setGroupStudentsList] = useState([]);
  const [assigningGroup, setAssigningGroup] = useState(null);
  const [duplicatingPackId, setDuplicatingPackId] = useState(null);

  // Form states
  const [groupForm, setGroupForm] = useState({ name: '', level: 'Elementary' });
  const [submittingGroup, setSubmittingGroup] = useState(false);
  const [copiedCode, setCopiedCode] = useState('');

  const loadTeacherData = async () => {
    setLoading(true);
    try {
      const [groupsData, packsData] = await Promise.all([
        getTeacherGroups(centerId, teacherId),
        getCenterCustomPacks(centerId)
      ]);
      setGroups(groupsData);
      setCustomPacks(packsData);
    } catch (err) {
      console.error('Error loading teacher data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeacherData();
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

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const handleOpenStudentsModal = async (group) => {
    setViewingGroupStudents(group);
    try {
      const list = await getGroupStudents(centerId, group.id);
      setGroupStudentsList(list);
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

  return (
    <div className="teacher-dashboard-container">
      {/* Header */}
      <header className="teacher-header">
        <div>
          <span className="teacher-badge"><Award size={16} /> O'qituvchi Ish Paneli</span>
          <h1>Salom, {teacherName}!</h1>
          <p>Guruhlaringizni boshqaring, so'z packlarini biriktiring va o'quvchilar progressini kuzatib boring.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-create-group" onClick={() => setShowPackEditor(true)} style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
            <Sparkles size={18} /> Yangi Pack Yaratish
          </button>
          <button className="btn-create-group" onClick={() => setShowCreateModal(true)}>
            <Plus size={18} /> Yangi Guruh Yaratish
          </button>
        </div>
      </header>

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

      {/* Groups Grid */}
      {loading ? (
        <div className="loading-spinner">Guruhlar yuklanmoqda...</div>
      ) : groups.length === 0 ? (
        <div className="empty-state">
          <Users size={48} />
          <p>Hozircha guruhlaringiz yo'q.</p>
          <button className="btn-create-group" onClick={() => setShowCreateModal(true)}>
            Yangi Guruh Yaratish
          </button>
        </div>
      ) : (
        <div className="teacher-groups-grid">
          {groups.map((group) => (
            <div key={group.id} className="teacher-group-card">
              <div className="group-card-header">
                <div>
                  <span className="group-level-badge">{group.level}</span>
                  <h3>{group.name}</h3>
                </div>
                
                <div className="group-code-pill" onClick={() => copyCode(group.code)} title="Nusxalash uchun bosing">
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

              <div className="group-card-actions">
                <button className="btn-group-action" onClick={() => handleOpenStudentsModal(group)}>
                  <Eye size={16} /> Progress ({group.studentsCount || 0})
                </button>
                <button className="btn-group-action" onClick={() => setAssigningGroup(group)}>
                  <BookOpen size={16} /> Pack Biriktirish
                </button>
                <button className="btn-group-action btn-transfer" onClick={() => setTransferingGroup(group)} title="Guruhni o'tkazish">
                  <ArrowRightLeft size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Packs */}
      <div style={{ marginTop: '2.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem' }}>
          Custom So'z Packlari ({customPacks.length})
        </h2>

        {customPacks.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={40} />
            <p>Hozircha custom packlar yaratilmagan.</p>
          </div>
        ) : (
          <div className="packs-grid">
            {customPacks.map((pack) => (
              <div key={pack.id} className="custom-pack-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="pack-level-tag">{pack.level}</div>
                  <div className="pack-card-actions">
                    <button
                      className="btn-invite-icon"
                      title="Nusxalash"
                      disabled={duplicatingPackId === pack.id}
                      onClick={() => handleDuplicatePack(pack)}
                    >
                      <Copy size={14} />
                    </button>
                    <button className="btn-invite-icon danger" title="O'chirish" onClick={() => handleDeletePack(pack)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <h3>{pack.title}</h3>
                <p className="pack-desc">{pack.description || 'Izoh yo\'q'}</p>
                <div className="pack-meta">
                  <span><strong>{pack.wordCount || (pack.words ? pack.words.length : 0)}</strong> ta so'z</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2><Users size={20} /> Yangi Guruh Yaratish</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="form-group">
                <label>Guruh Nomi *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="masalan: IELTS Morning Group 2"
                  value={groupForm.name}
                  onChange={e => setGroupForm({ ...groupForm, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Daraja / Bosqich</label>
                <select 
                  value={groupForm.level} 
                  onChange={e => setGroupForm({ ...groupForm, level: e.target.value })}
                  style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <option value="Beginner">Beginner (A1)</option>
                  <option value="Elementary">Elementary (A2)</option>
                  <option value="Intermediate">Intermediate (B1-B2)</option>
                  <option value="Advanced">Advanced (C1-C2)</option>
                  <option value="IELTS">IELTS Master</option>
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
                Ushbu guruhga hali o'quvchilar ulanmagan.<br/>
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
