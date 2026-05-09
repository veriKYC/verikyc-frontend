export const DOCUMENT_TYPES = [
  { value: 'PAN', label: 'PAN Card' },
  { value: 'AADHAAR', label: 'Aadhaar Card' },
  { value: 'PASSPORT', label: 'Passport' },
  { value: 'DL', label: 'Driving License' },
  { value: 'CHEQUE', label: 'Bank Cheque' },
];

export const STATUS_CONFIG = {
  QUEUED: { label: 'Queued', color: 'bg-slate-100 text-slate-700', dot: 'bg-slate-400' },
  PROCESSING: { label: 'Processing', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
  VERIFIED: { label: 'Verified', color: 'bg-success-50 text-success-600', dot: 'bg-success-500' },
  FAILED: { label: 'Failed', color: 'bg-danger-50 text-danger-600', dot: 'bg-danger-500' },
  REVIEW_NEEDED: { label: 'Review Needed', color: 'bg-warning-50 text-warning-600', dot: 'bg-warning-500' },
  CANCELLED: { label: 'Cancelled', color: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400' },
};

export const TERMINAL_STATUSES = ['VERIFIED', 'FAILED', 'REVIEW_NEEDED', 'CANCELLED'];

export const GOV_VERIFICATION_MESSAGES = {
  PAN: 'PAN verification via NSDL — Coming Soon',
  AADHAAR: 'Aadhaar verification via UIDAI — Coming Soon',
  PASSPORT: 'Passport verification — Coming Soon',
  DL: 'Driving License verification via Vahan/Sarathi — Coming Soon',
  CHEQUE: 'IFSC validation via Razorpay API — Planned',
};
