import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import Flashcard from '../../components/Practice/Flashcard';
import { updateStudentGroupProgress } from '../../services/corpService';
import './CorpPractice.css';

// Simple, single-screen practice session for corp students — deliberately
// not PracticePage.jsx (which is wired to the individual-learner RTDB word
// tree). Feeds a corp custom pack's words straight into the same stateless
// Flashcard component the individual app uses.
export default function CorpPractice() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pack, centerId, groupId, studentId } = location.state || {};

  const [results, setResults] = useState(null);
  const [saving, setSaving] = useState(false);

  const words = useMemo(() => {
    if (!pack?.words) return [];
    return pack.words.map((w, i) => ({ id: String(i), ...w }));
  }, [pack]);

  if (!pack || words.length === 0) {
    navigate('/corp/student', { replace: true });
    return null;
  }

  const handleComplete = async (summary) => {
    setResults(summary);
    if (centerId && groupId && studentId) {
      setSaving(true);
      try {
        await updateStudentGroupProgress(centerId, groupId, studentId, pack.id, summary.correctCount);
      } catch (err) {
        console.error('Error saving progress:', err);
      } finally {
        setSaving(false);
      }
    }
  };

  if (results) {
    return (
      <div className="corp-practice-container">
        <div className="corp-practice-summary">
          <h2>{pack.title} — Yakunlandi!</h2>
          <div className="cp-summary-stats">
            <div className="cp-stat correct">
              <CheckCircle2 size={22} /> <span>{results.correctCount} to'g'ri</span>
            </div>
            <div className="cp-stat incorrect">
              <XCircle size={22} /> <span>{results.incorrectCount} xato</span>
            </div>
          </div>
          {saving && <p className="cp-saving">Natija saqlanmoqda...</p>}
          <div className="cp-summary-actions">
            <button className="btn-secondary" onClick={() => setResults(null)}>
              <RotateCcw size={16} /> Qayta o'rganish
            </button>
            <button className="btn-primary" onClick={() => navigate('/corp/student')}>
              <ArrowLeft size={16} /> Orqaga
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="corp-practice-container">
      <button className="cp-back-btn" onClick={() => navigate('/corp/student')}>
        <ArrowLeft size={16} /> {pack.title}
      </button>
      <Flashcard
        words={words}
        onComplete={handleComplete}
        onUpdateWord={async () => null}
        onAnswer={() => {}}
        onProgress={() => {}}
      />
    </div>
  );
}
