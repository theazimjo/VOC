import { ClipboardList } from 'lucide-react';
import './learn/StudentCorpLearn.css';

export default function StudentCorpAssessment() {
  return (
    <div className="student-corp-container">
      <div className="empty-state">
        <div className="empty-state-icon"><ClipboardList size={40} strokeWidth={1.6} /></div>
        <h3>Assessment Coming Soon</h3>
        <p>Official tests and topic assessments are being prepared. They will appear here soon.</p>
      </div>
    </div>
  );
}
