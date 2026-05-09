import Card from '../common/Card';
import { GOV_VERIFICATION_MESSAGES } from '../../utils/constants';

export default function GovernmentVerificationCard({ documentType }) {
  const message = GOV_VERIFICATION_MESSAGES[documentType] || 'Government verification — Coming Soon';
  const isPlanned = documentType === 'CHEQUE';

  return (
    <Card className="p-5 border-dashed">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-sm font-semibold text-slate-700">Government Verification</h4>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium
              ${isPlanned
                ? 'bg-primary-50 text-primary-600'
                : 'bg-slate-100 text-slate-500'
              }`}
            >
              {isPlanned ? 'Planned' : 'Coming Soon'}
            </span>
          </div>
          <p className="text-sm text-slate-500">{message}</p>
          <p className="text-xs text-slate-400 mt-2">
            External verification against government databases — planned in a future release
          </p>
        </div>
      </div>
    </Card>
  );
}
