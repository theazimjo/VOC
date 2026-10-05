import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { GraduationCap, Building2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getCenterByTeacherJoinCode, joinCenterAsTeacher } from '../../services/corpService';
import { clearCorpIdentityCache } from '../../hooks/useCorpRole';
import { setPendingTeacherJoinCode, clearPendingTeacherJoinCode } from '../../utils/pendingJoin';
import IosSpinner from '../../components/common/IosSpinner';
import VocLogo from '../../components/common/VocLogo';
import './JoinGroupPage.css';

// Public landing for a center admin's teacher invite link (/join-teacher/:code)
// — the teacher-side twin of JoinGroupPage. A signed-out visitor sees which
// center they're joining and is sent through login/registration with the
// code parked in localStorage, which brings them straight back here.
export default function JoinTeacherPage() {
  const { code } = useParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [info, setInfo] = useState(null); // { centerId, centerName }
  const [status, setStatus] = useState('loading'); // loading | ready | invalid
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
        const result = await getCenterByTeacherJoinCode(code);
        if (!result) {
          if (!cancelled) setStatus('invalid');
          return;
        }
        if (!cancelled) {
          setInfo(result);
          setStatus('ready');
        }
      } catch (err) {
        console.error('Error loading teacher invite:', err);
        if (!cancelled) setStatus('invalid');
      }
    }
    load();
    return () => { cancelled = true; };
  }, [code]);

  const goToAuth = (path) => {
    setPendingTeacherJoinCode(code);
    navigate(path);
  };

  const handleJoin = async () => {
    setJoining(true);
    setError('');
    try {
      await joinCenterAsTeacher(code, user.uid, {
        name: user.displayName || user.email || 'Teacher',
        email: user.email || '',
      });
      // The just-created corpUsers role wouldn't be picked up until the
      // short-lived identity cache (see useCorpRole) expires on its own.
      clearCorpIdentityCache(user.uid);
      clearPendingTeacherJoinCode();
      navigate('/corp/teacher', { replace: true });
    } catch (err) {
      console.error('Error joining center as teacher:', err);
      setError(err.message || "Markazga qo'shilib bo'lmadi. Internetni tekshirib, qayta urinib ko'ring.");
      setJoining(false);
    }
  };

  const dismiss = () => {
    clearPendingTeacherJoinCode();
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
            <p className="join-text">Bu taklif havolasi eskirgan yoki markaz o'chirilgan. Markaz adminidan yangi havola so'rang.</p>
            <button type="button" className="join-btn join-btn-secondary" onClick={dismiss}>Bosh sahifaga</button>
          </>
        ) : (
          <>
            <p className="join-eyebrow">Sizni o'qituvchi sifatida taklif qilishdi</p>
            <div className="join-group">
              <div className="join-icon"><GraduationCap size={26} /></div>
              <div className="join-group-name">{info.centerName}</div>
            </div>

            <div className="join-meta">
              <div className="join-meta-row">
                <Building2 size={16} />
                <span>{info.centerName}</span>
              </div>
            </div>

            {!user ? (
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
                {error && <p className="join-text join-text-warning">{error}</p>}
                <button type="button" className="join-btn" onClick={handleJoin} disabled={joining}>
                  {joining ? <IosSpinner size={18} /> : "O'qituvchi sifatida qo'shilish"}
                </button>
                <p className="join-account">
                  {user.displayName || user.email} sifatida · <Link to="/" onClick={clearPendingTeacherJoinCode}>Bekor qilish</Link>
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
