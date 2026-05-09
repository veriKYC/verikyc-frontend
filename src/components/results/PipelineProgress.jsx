const STEPS = [
  { key: 'QUEUED', label: 'Queued' },
  { key: 'PROCESSING', label: 'Processing' },
  { key: 'COMPLETE', label: 'Complete' },
];

function getStepIndex(status) {
  if (status === 'QUEUED') return 0;
  if (status === 'PROCESSING') return 1;
  return 2;
}

export default function PipelineProgress({ status }) {
  const currentIndex = getStepIndex(status);
  const isFailed = status === 'FAILED';
  const isReview = status === 'REVIEW_NEEDED';

  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === STEPS.length - 1;

        let dotColor = 'bg-slate-200';
        let textColor = 'text-slate-400';

        if (isCompleted) {
          dotColor = 'bg-success-500';
          textColor = 'text-success-600';
        } else if (isCurrent && isFailed && isLast) {
          dotColor = 'bg-danger-500';
          textColor = 'text-danger-600';
        } else if (isCurrent && isReview && isLast) {
          dotColor = 'bg-warning-500';
          textColor = 'text-warning-600';
        } else if (isCurrent && isLast) {
          dotColor = 'bg-success-500';
          textColor = 'text-success-600';
        } else if (isCurrent) {
          dotColor = 'bg-primary-500 animate-pulse';
          textColor = 'text-primary-600';
        }

        return (
          <div key={step.key} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${dotColor}`} />
              <span className={`text-xs mt-1 font-medium ${textColor}`}>
                {isLast && isFailed ? 'Failed' : isLast && isReview ? 'Review' : step.label}
              </span>
            </div>
            {!isLast && (
              <div className={`w-16 h-0.5 mb-4 ${isCompleted ? 'bg-success-500' : 'bg-slate-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
