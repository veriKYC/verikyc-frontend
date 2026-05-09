import { formatConfidence } from '../../utils/formatters';

export default function ConfidenceBar({ label, value }) {
  if (value == null) return null;

  let barColor = 'bg-danger-500';
  if (value > 0.8) barColor = 'bg-success-500';
  else if (value > 0.5) barColor = 'bg-warning-500';

  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-xs text-slate-500 w-16 text-right">{formatConfidence(value)}</span>}
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(value * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
