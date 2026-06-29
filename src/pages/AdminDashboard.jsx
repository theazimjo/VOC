import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardCopy, Check, Send, AlertTriangle, User, Calendar, BookOpen, 
  Award, Headphones, PenTool, Mic, RefreshCw, ChevronRight, LayoutDashboard, FileText
} from 'lucide-react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [submissions, setSubmissions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [copied, setCopied] = useState(false);
  const [pastedJson, setPastedJson] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. Authenticate Admin
  const isAdmin = user?.email?.toLowerCase() === 'azimjonxolmirzayev30@gmail.com';

  useEffect(() => {
    if (!isAdmin) {
      navigate('/', { replace: true });
      return;
    }

    const subsRef = ref(db, 'ielts_submissions');
    const unsub = onValue(subsRef, (snap) => {
      const val = snap.val() || {};
      const list = Object.entries(val).map(([k, v]) => ({ id: k, ...v }));
      // Sort: pending first, then by date descending
      list.sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.takenAt || 0) - new Date(a.takenAt || 0);
      });
      setSubmissions(list);
      setLoading(false);
    });

    return () => unsub();
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  // 2. Format Date helper
  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return `${d.getDate().toString().padStart(2,'0')}.${(d.getMonth()+1).toString().padStart(2,'0')}.${d.getFullYear()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  };

  // 3. Build Prompt & Copy Candidate Work to Clipboard
  const handleCopyWork = () => {
    if (!selectedSub) return;

    const dataToCopy = {
      writing: {
        task1: {
          prompt: "Summarise the visual information (bar chart / table / graph). Describe trends, compare data, group key features.",
          studentResponse: selectedSub.writingTask1Text || ''
        },
        task2: {
          prompt: "Write an essay responding to the candidate's topic question. Present arguments, explain ideas with evidence.",
          studentResponse: selectedSub.writingTask2Text || ''
        }
      },
      speaking: {
        transcripts: (selectedSub.speakingTranscripts || []).map(t => ({
          part: t.part + 1,
          questionNumber: t.step + 1,
          candidateResponse: t.text
        }))
      }
    };

    const promptText = `Evaluate the following candidate's IELTS Writing and Speaking answers strictly. Use standard IELTS scoring rules (0.0 to 9.0 in 0.5 increments).

CANDIDATE DATA (JSON):
${JSON.stringify(dataToCopy, null, 2)}

You MUST output your evaluation strictly as a valid JSON object matching the schema below. Do not output markdown, notes, explanations, or any text other than the JSON object itself.

JSON OUTPUT FORMAT SCHEMA:
{
  "writingBand": 7.0,
  "writingDetails": {
    "status": "completed",
    "task1": {
      "band": 6.5,
      "feedback": "Candidate summarizes main features but vocabulary is repetitive. Grammar is mostly accurate with minor slips.",
      "criteria": {
        "taskAchievement": 6.5,
        "coherence": 6.5,
        "lexicalResource": 6.0,
        "grammar": 7.0
      }
    },
    "task2": {
      "band": 7.0,
      "feedback": "Well-structured essay with clear arguments. Good use of linking words and complex sentences.",
      "criteria": {
        "taskAchievement": 7.0,
        "coherence": 7.0,
        "lexicalResource": 7.0,
        "grammar": 7.0
      }
    }
  },
  "speakingBand": 7.0,
  "speakingFeedback": "Fluent speech with logical transitions. Uses complex sentence structures. Good lexical resources and clear syntax."
}`;

    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 4. Submit Gradings JSON
  const handleSubmitGrading = async () => {
    if (!selectedSub) return;
    setErrorMsg('');
    setSuccessMsg('');
    setSubmitting(true);

    try {
      // Clean up pastings if wrapped in ```json
      const cleanJson = pastedJson.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      const writingBand = Number(parsed.writingBand);
      const speakingBand = Number(parsed.speakingBand);
      const writingDetails = parsed.writingDetails || {};
      const speakingFeedback = parsed.speakingFeedback || '';

      if (isNaN(writingBand) || isNaN(speakingBand)) {
        throw new Error("writingBand or speakingBand must be numeric scores!");
      }

      // Automatically recalculate Overall Band
      const lBand = Number(selectedSub.listeningBand || 0);
      const rBand = Number(selectedSub.readingBand || 0);
      const overallBand = Math.round(((lBand + rBand + writingBand + speakingBand) / 4) * 2) / 2;

      // Update paths
      const updates = {};
      
      // Update global submission
      updates[`ielts_submissions/${selectedSub.id}/status`] = 'graded';
      updates[`ielts_submissions/${selectedSub.id}/overallBand`] = overallBand;
      updates[`ielts_submissions/${selectedSub.id}/writingBand`] = writingBand;
      updates[`ielts_submissions/${selectedSub.id}/speakingBand`] = speakingBand;
      updates[`ielts_submissions/${selectedSub.id}/writingDetails`] = writingDetails;
      updates[`ielts_submissions/${selectedSub.id}/writingIsPending`] = false;
      updates[`ielts_submissions/${selectedSub.id}/speakingFeedback`] = speakingFeedback;
      updates[`ielts_submissions/${selectedSub.id}/speakingIsPending`] = false;
      updates[`ielts_submissions/${selectedSub.id}/examData/overallBand`] = overallBand;
      updates[`ielts_submissions/${selectedSub.id}/examData/writingBand`] = writingBand;
      updates[`ielts_submissions/${selectedSub.id}/examData/speakingBand`] = speakingBand;
      updates[`ielts_submissions/${selectedSub.id}/examData/writingDetails`] = writingDetails;
      updates[`ielts_submissions/${selectedSub.id}/examData/writingIsPending`] = false;
      updates[`ielts_submissions/${selectedSub.id}/examData/speakingFeedback`] = speakingFeedback;
      updates[`ielts_submissions/${selectedSub.id}/examData/speakingIsPending`] = false;

      // Update student's specific record
      updates[`users/${selectedSub.userId}/ielts/full_exams/${selectedSub.id}/overallBand`] = overallBand;
      updates[`users/${selectedSub.userId}/ielts/full_exams/${selectedSub.id}/writingBand`] = writingBand;
      updates[`users/${selectedSub.userId}/ielts/full_exams/${selectedSub.id}/speakingBand`] = speakingBand;
      updates[`users/${selectedSub.userId}/ielts/full_exams/${selectedSub.id}/writingDetails`] = writingDetails;
      updates[`users/${selectedSub.userId}/ielts/full_exams/${selectedSub.id}/writingIsPending`] = false;
      updates[`users/${selectedSub.userId}/ielts/full_exams/${selectedSub.id}/speakingFeedback`] = speakingFeedback;
      updates[`users/${selectedSub.userId}/ielts/full_exams/${selectedSub.id}/speakingIsPending`] = false;

      await update(ref(db), updates);

      setSuccessMsg('Natijalar muvaffaqiyatli saqlandi! Talaba sahifasi real-time yangilandi.');
      setPastedJson('');
      setSelectedSub(null);
    } catch (e) {
      setErrorMsg(`JSON formati xato: ${e.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header-row">
        <div className="admin-title-wrap">
          <LayoutDashboard size={24} className="accent-icon" />
          <h2>IELTS Submissions Grading Control</h2>
        </div>
        <p className="admin-subtext">Talabalar topshirgan to'liq IELTS mock imtihonlarini baholash va tekshirish oynasi</p>
      </div>

      <div className="admin-content-grid">
        {/* Left Side: Submissions list */}
        <div className="admin-list-card">
          <h3>Topshirilgan mocklar ({submissions.length})</h3>
          {loading ? (
            <div className="admin-loading-spinner">
              <RefreshCw className="animate-spin" />
              <span>Yuklanmoqda...</span>
            </div>
          ) : submissions.length === 0 ? (
            <p className="admin-empty-text">Hozircha topshirilgan mocklar mavjud emas.</p>
          ) : (
            <div className="admin-list">
              {submissions.map(sub => (
                <div 
                  key={sub.id} 
                  className={`admin-sub-item ${selectedSub?.id === sub.id ? 'active' : ''} ${sub.status}`}
                  onClick={() => {
                    setSelectedSub(sub);
                    setErrorMsg('');
                    setSuccessMsg('');
                    setPastedJson('');
                  }}
                >
                  <div className="sub-item-meta">
                    <User size={16} />
                    <span className="sub-user-name">{sub.userName}</span>
                  </div>
                  <div className="sub-item-email">{sub.userEmail}</div>
                  <div className="sub-item-footer">
                    <span className="sub-item-date">{formatDate(sub.takenAt)}</span>
                    <span className={`status-badge ${sub.status}`}>
                      {sub.status === 'pending' ? '⏳ Pending' : '✅ Graded'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details and Grading Actions */}
        <div className="admin-detail-card">
          {selectedSub ? (
            <div className="admin-detail-body">
              <div className="detail-header">
                <div>
                  <h4>{selectedSub.userName}</h4>
                  <p className="detail-email">{selectedSub.userEmail} • ID: {selectedSub.id}</p>
                </div>
                <div className="detail-date-badge">
                  <Calendar size={14} />
                  <span>{formatDate(selectedSub.takenAt)}</span>
                </div>
              </div>

              {/* Sub-scores info */}
              <div className="detail-scores-row">
                <div className="score-badge listening">
                  <Headphones size={14} />
                  <span>L: <strong>{selectedSub.listeningBand ? selectedSub.listeningBand.toFixed(1) : '—'}</strong></span>
                </div>
                <div className="score-badge reading">
                  <BookOpen size={14} />
                  <span>R: <strong>{selectedSub.readingBand ? selectedSub.readingBand.toFixed(1) : '—'}</strong></span>
                </div>
                <div className="score-badge writing">
                  <PenTool size={14} />
                  <span>W: <strong>{selectedSub.writingBand ? selectedSub.writingBand.toFixed(1) : '⏳'}</strong></span>
                </div>
                <div className="score-badge speaking">
                  <Mic size={14} />
                  <span>S: <strong>{selectedSub.speakingBand ? selectedSub.speakingBand.toFixed(1) : '⏳'}</strong></span>
                </div>
                <div className="score-badge overall">
                  <Award size={14} />
                  <span>Overall: <strong>{selectedSub.overallBand ? selectedSub.overallBand.toFixed(1) : '⏳'}</strong></span>
                </div>
              </div>

              <div className="sections-accordion">
                {/* Writing Task Section */}
                <div className="accordion-section">
                  <div className="accordion-header">
                    <PenTool size={16} />
                    <h5>1. Writing Tasks</h5>
                  </div>
                  <div className="accordion-content">
                    <div className="task-subcontent">
                      <h6>Task 1 (Report)</h6>
                      <div className="submitted-text-box">
                        {selectedSub.writingTask1Text || <span className="empty-text">Ushbu topshiriq bajarilmagan.</span>}
                      </div>
                      <span className="word-count-badge">Task 1: {selectedSub.writingTask1Text ? selectedSub.writingTask1Text.trim().split(/\s+/).length : 0} so'z</span>
                    </div>

                    <div className="task-subcontent" style={{ marginTop: '16px' }}>
                      <h6>Task 2 (Essay)</h6>
                      <div className="submitted-text-box">
                        {selectedSub.writingTask2Text || <span className="empty-text">Ushbu topshiriq bajarilmagan.</span>}
                      </div>
                      <span className="word-count-badge">Task 2: {selectedSub.writingTask2Text ? selectedSub.writingTask2Text.trim().split(/\s+/).length : 0} so'z</span>
                    </div>
                  </div>
                </div>

                {/* Speaking Section */}
                <div className="accordion-section" style={{ marginTop: '16px' }}>
                  <div className="accordion-header">
                    <Mic size={16} />
                    <h5>2. Speaking Transcripts</h5>
                  </div>
                  <div className="accordion-content">
                    {selectedSub.speakingTranscripts && selectedSub.speakingTranscripts.length > 0 ? (
                      <div className="speaking-transcripts-list">
                        {selectedSub.speakingTranscripts.map((t, idx) => (
                          <div key={idx} className="transcript-item">
                            <span className="transcript-meta">Part {t.part + 1}, Q{t.step + 1}</span>
                            <p>"{t.text}"</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="empty-text">Speaking transkriptlari mavjud emas.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action grading area */}
              <div className="grading-control-box">
                <h4>Natijalarni Baholash (AI yordamida)</h4>
                <p className="grading-hint">
                  Quyidagi tugmani bossangiz, talabaning Writing va Speaking matnlari tayyor so'rov (prompt) shaklida clipboard'ga nusxalanadi. Uni ChatGPT/Claude'ga yuborib baholating va javob JSONni pastga kiriting.
                </p>

                <button className="btn btn-primary copy-work-btn" onClick={handleCopyWork}>
                  {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
                  {copied ? "Nusxalandi!" : "AI uchun so'rovni nusxalash"}
                </button>

                <div className="json-input-area">
                  <label htmlFor="json-paste">Baholash JSONini kiriting:</label>
                  <textarea
                    id="json-paste"
                    className="json-textarea"
                    placeholder="AI qaytargan JSON kodini shu yerga paste qiling..."
                    value={pastedJson}
                    onChange={(e) => setPastedJson(e.target.value)}
                  />
                </div>

                {errorMsg && (
                  <div className="error-alert">
                    <AlertTriangle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {successMsg && (
                  <div className="success-alert">
                    <Check size={16} />
                    <span>{successMsg}</span>
                  </div>
                )}

                <button 
                  className="btn btn-success submit-grade-btn" 
                  onClick={handleSubmitGrading}
                  disabled={submitting || !pastedJson.trim()}
                >
                  <Send size={16} />
                  {submitting ? "Saqlanmoqda..." : "Baholarni Tasdiqlash va Saqlash"}
                </button>
              </div>
            </div>
          ) : (
            <div className="detail-empty-state">
              <FileText size={48} />
              <p>Chap tarafdagi ro'yxatdan mock imtihon topshiriqlaridan birortasini tanlang.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
