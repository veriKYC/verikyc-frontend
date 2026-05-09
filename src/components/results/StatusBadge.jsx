import { STATUS_CONFIG } from '../../utils/constants';

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.QUEUED;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'PROCESSING' ? 'animate-pulse' : ''}`} />
      {config.label}
    </span>
  );
}
