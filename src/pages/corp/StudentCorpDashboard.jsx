import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, BookOpen, Award, ArrowRight,
  Sparkles, LogOut, Play, Key, CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useGroupMode } from '../../hooks/useGroupMode';
import { getGroup, getCenterCustomPacks, setAppMode } from '../../services/corpService';
import './StudentCorpDashboard.css';

export default function StudentCorpDashboard() {
  const { user, logout } = useAuth();
  const { loading: groupModeLoading, membership } = useGroupMode();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [assignedPacks, setAssignedPacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!membership) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    async function loadGroupPacks() {
      setLoading(true);
      try {
        const [freshGroup, centerPacks] = await Promise.all([
          getGroup(membership.centerId, membership.groupId),
          getCenterCustomPacks(membership.centerId),
        ]);
        if (cancelled) return;

        setGroup(freshGroup);
        const assignedIds = new Set(freshGroup?.assignedPacks || []);
        setAssignedPacks(centerPacks.filter(p => assignedIds.has(p.id)));
      } catch (err) {
        console.error('Error loading student packs:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadGroupPacks();
    return () => { cancelled = true; };
  }, [membership]);

  const startPractice = (pack) => {
    navigate('/corp/practice', {
      state: {
        pack,
        centerId: membership.centerId,
        groupId: membership.groupId,
        studentId: user.uid,
      },
    });
  };

  const handleReturnToIndividual = async () => {
    await setAppMode(user.uid, 'individual');
    navigate('/');
  };

  if (groupModeLoading || loading) {
    return <div className="student-corp-container"><div className="loading-spinner">Yuklanmoqda...</div></div>;
  }

  if (!membership || !user) {
    return (
      <div className="student-corp-container">
        <div className="st-no-group-state">
          <div className="st-no-group-icon"><Key size={32} /></div>
          <h2>Hali hech qanday guruhga ulanmagansiz</h2>
          <p>Guruhga qo'shilish uchun VOC hisobingizga kiring va Profil sahifasidan 6 xonali guruh kodini kiriting.</p>
          <button className="btn-start-learn" onClick={() => navigate(user ? '/profile' : '/login')}>
            {user ? 'Profilga o\'tish' : 'Kirish'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  const student = group?.students?.[user.uid];
  const learnedPacksCount = Object.keys(student?.progress || {}).length;
  const progressPct = assignedPacks.length > 0
    ? Math.round((learnedPacksCount / assignedPacks.length) * 100)
    : 0;

  return (
    <div className="student-corp-container">
      {/* Top Banner */}
      <header className="student-corp-header">
        <div className="st-header-meta">
          <span className="st-badge"><GraduationCap size={16} /> Guruh O'quvchisi</span>
          <h1>Salom, {student?.name || user.displayName || user.email}!</h1>
          <p>Guruh: <strong>{membership.groupName}</strong> • PIN: <code>{membership.groupCode}</code></p>
        </div>

        <div className="st-header-actions">
          <button className="btn-leave-corp" onClick={handleReturnToIndividual}>
            <ArrowRight size={16} /> Individual rejimga qaytish
          </button>
          <button className="btn-leave-corp" onClick={logout}>
            <LogOut size={16} /> Chiqish
          </button>
        </div>
      </header>

      {/* Progress Card */}
      <div className="st-progress-card">
        <div className="st-prog-info">
          <div className="st-prog-icon">
            <Award size={28} />
          </div>
          <div>
            <h3>Sizning O'rganish Holatingiz</h3>
            <p>O'qituvchingiz tomonidan berilgan vazifalarni o'z vaqtida bajarib boring.</p>
          </div>
        </div>

        <div className="st-prog-meter">
          <div className="meter-label">
            <span>Progress: <strong>{learnedPacksCount} / {assignedPacks.length}</strong> pack</span>
            <span>{progressPct}%</span>
          </div>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width: `${progressPct}%` }}></div>
          </div>
        </div>
      </div>

      {/* Assigned Word Packs Section */}
      <div className="st-packs-section">
        <div className="section-title">
          <h2><BookOpen size={22} className="icon-purple" /> O'rgatilinadigan Packlar</h2>
          <p>Ushbu so'zlarni yodlash uchun kartochkani bosing.</p>
        </div>

        {assignedPacks.length === 0 ? (
          <div className="st-empty-state">
            <Sparkles size={40} />
            <p>Hozircha sizga hech qanday pack biriktirilmagan. O'qituvchingiz tez orada topshiriq beradi.</p>
          </div>
        ) : (
          <div className="st-packs-grid">
            {assignedPacks.map((pack) => {
              const done = Boolean(student?.progress?.[pack.id]);
              return (
                <div key={pack.id} className="st-pack-card">
                  <div className="st-pack-head">
                    <span className="st-level-tag">{pack.level}</span>
                    {done ? <CheckCircle2 size={18} className="icon-purple" /> : <Sparkles size={18} className="icon-purple" />}
                  </div>

                  <h3>{pack.title}</h3>
                  <p>{pack.description || 'Guruh uchun maxsus so\'zlar to\'plami'}</p>

                  <div className="st-pack-foot">
                    <span><strong>{pack.wordCount || (pack.words ? pack.words.length : 0)}</strong> ta so'z</span>
                    <button className="btn-start-learn" onClick={() => startPractice(pack)}>
                      <Play size={16} /> {done ? 'Qayta o\'rganish' : 'O\'rganishni Boshlash'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
