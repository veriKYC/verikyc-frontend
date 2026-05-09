import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import StatusBadge from '../results/StatusBadge';
import { formatDate, truncateUUID } from '../../utils/formatters';

export default function VerificationCard({ document }) {
  const navigate = useNavigate();
  const isVerified = document.status === 'VERIFIED';

  const handleClick = () => {
    if (isVerified) {
      navigate(`/documents/${document.id}/results`);
    } else {
      navigate(`/documents/${document.id}`);
    }
  };

  return (
    <Card
      className="p-5 cursor-pointer hover:border-primary-300 hover:shadow-md transition-all"
      onClick={handleClick}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono text-slate-400">
          #{truncateUUID(document.id)}
        </span>
        <StatusBadge status={document.status} />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">{formatDate(document.createdAt)}</span>
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Card>
  );
}
