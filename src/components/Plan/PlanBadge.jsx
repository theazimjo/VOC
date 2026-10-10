import { Crown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useStudentPlan } from '../../hooks/usePlan';

// Gold "Premium" pill with a crown; only shown for learners on Plus.
export default function PlanBadge({ compact = false }) {
  const { user } = useAuth();
  const { planId, loaded } = useStudentPlan(user?.uid);
  if (!user || !loaded || planId !== 'plus') return null;
  return (
    <span
      title="Premium"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, padding: compact ? '3px 6px' : '3px 9px',
        borderRadius: 999, background: 'linear-gradient(135deg, #FFD60A, #FF9F0A)', color: '#3A2A00',
        font: '700 0.6875rem/1 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', letterSpacing: '0.04em',
        verticalAlign: 'middle', whiteSpace: 'nowrap',
      }}
    >
      <Crown size={12} strokeWidth={2.6} />
      {!compact && 'PREMIUM'}
    </span>
  );
}
