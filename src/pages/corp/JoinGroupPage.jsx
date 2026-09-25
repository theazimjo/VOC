import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { Users, Building2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { joinGroupAsUser, switchActiveGroup } from '../../services/corpService';
import { setPendingJoinCode, clearPendingJoinCode } from '../../utils/pendingJoin';
import IosSpinner from '../../components/common/IosSpinner';
import VocLogo from '../../components/common/VocLogo';
import './JoinGroupPage.css';

// Public landing for a teacher's invite link / QR code (/join/:code). A
// signed-out visitor sees which group they're joining and is sent through
// login or registration with the code parked in localStorage (see
// utils/pendingJoin.js), which brings them straight back here afterwards.
export default function JoinGroupPage() {
  const { code } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [info, setInfo] = useState(null); // { centerId, groupId, groupName, centerName, teacherName, archived }
  const [status, setStatus] = useState('loading'); // loading | ready | invalid
  const [alreadyMember, setAlreadyMember] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!/^\d{6}$/.test(code || '')) {
        setStatus('invalid');
        return;
      }
      try {
        const codeSnap = await get(ref(db, `groupCodes/${code}`));
        if (!codeSnap.exists()) {
          if (!cancelled) setStatus('invalid');
          return;
        }
        const { centerId, groupId } = codeSnap.val();
        const [groupSnap, centerNameSnap] = await Promise.all([
          get(ref(db, `centers/${centerId}/groups/${groupId}`)),
          get(ref(db, `centers/${centerId}/name`)),
        ]);
        if (!groupSnap.exists()) {
          if (!cancelled) setStatus('invalid');
          return;
        }
        const group = groupSnap.val();
        let teacherName = '';
        if (group.teacherId) {
          const teacherSnap = await get(ref(db, `centers/${centerId}/teachers/${group.teacherId}/name`));
          teacherName = teacherSnap.exists() ? teacherSnap.val() : '';
        }
        if (cancelled) return;
        setInfo({
          centerId,
          groupId,
          groupName: group.name || 'Guruh',
          level: group.level || '',
          centerName: centerNameSnap.exists() ? centerNameSnap.val() : '',
          teacherName,
          archived: group.status === 'archived',
        });
        setStatus('ready');
      } catch (err) {
        console.error('Error loading invite:', err);
        if (!cancelled) setStatus('invalid');
      }
    }
    load();
    return () => { cancelled = true; };
  }, [code]);

  useEffect(() => {
    if (!user || !info) return;
    get(ref(db, `users/${user.uid}/groupMemberships/${info.groupId}`))
      .then((snap) => setAlreadyMember(snap.exists()))
      .catch(() => setAlreadyMember(false));
  }, [user, info]);

  const goToAuth = (path) => {
    setPendingJoinCode(code);
    navigate(path);
  };

  const handleJoin = async () => {
    setJoining(true);
    setError('');
    try {
      if (alreadyMember) {
        await switchActiveGroup(user.uid, info.groupId);
      } else {
        await joinGroupAsUser(code, user.uid, {
          name: user.displayName || user.email || "O'quvchi",
          email: user.email || '',
        });
      }
      clearPendingJoinCode();
      navigate('/corp/student', { replace: true });
    } catch (err) {
      console.error('Error joining group:', err);
      setError("Guruhga qo'shilib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.");
      setJoining(false);
    }
  };

  const dismiss = () => {
    clearPendingJoinCode();
    navigate('/', { replace: true });
  };

  if (status === 'loading' || authLoading) {
    return (
      <div className="join-page">
        <IosSpinner size={32} />
      </div>
    );
  }

  return (
    <div className="join-page">
      <div className="join-card">
        <div className="join-logo"><VocLogo /></div>

        {status === 'invalid' ? (
          <>
            <div className="join-icon join-icon-error"><AlertCircle size={28} /></div>
            <h1 className="join-title">Havola noto'g'ri</h1>
            <p className="join-text">Bu taklif havolasi eskirgan yoki guruh o'chirilgan. O'qituvchingizdan yangi havola so'rang.</p>
            <button type="button" className="join-btn join-btn-secondary" onClick={dismiss}>Bosh sahifaga</button>
          </>
        ) : (
          <>
            <p className="join-eyebrow">Sizni guruhga taklif qilishdi</p>
            <div className="join-group">
              <div className="join-icon"><Users size={26} /></div>
              <div className="join-group-name">{info.groupName}</div>
              {info.level && <div className="join-group-level">{info.level}</div>}
            </div>

            <div className="join-meta">
              {info.centerName && (
                <div className="join-meta-row">
                  <Building2 size={16} />
                  <span>{info.centerName}</span>
                </div>
              )}
              {info.teacherName && (
                <div className="join-meta-row">
                  <Users size={16} />
                  <span>O'qituvchi: {info.teacherName}</span>
                </div>
              )}
            </div>

            {info.archived ? (
              <p className="join-text join-text-warning">Bu guruh yopilgan, unga qo'shilib bo'lmaydi.</p>
            ) : !user ? (
              <>
                <p className="join-text">Qo'shilish uchun VOC hisobingizga kiring yoki yangi hisob oching. Bu bir daqiqa oladi.</p>
                <button type="button" className="join-btn" onClick={() => goToAuth('/register')}>
                  Ro'yxatdan o'tish
                </button>
                <button type="button" className="join-btn join-btn-secondary" onClick={() => goToAuth('/login')}>
                  Menda hisob bor — Kirish
                </button>
              </>
            ) : (
              <>
                {alreadyMember && (
                  <p className="join-text join-text-success">
                    <CheckCircle2 size={16} /> Siz allaqachon shu guruhdasiz.
                  </p>
                )}
                {error && <p className="join-text join-text-warning">{error}</p>}
                <button type="button" className="join-btn" onClick={handleJoin} disabled={joining}>
                  {joining ? <IosSpinner size={18} /> : alreadyMember ? 'Guruhga o\'tish' : 'Guruhga qo\'shilish'}
                </button>
                <p className="join-account">
                  {user.displayName || user.email} sifatida · <Link to="/" onClick={clearPendingJoinCode}>Bekor qilish</Link>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
