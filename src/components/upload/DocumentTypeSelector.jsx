import { DOCUMENT_TYPES } from '../../utils/constants';

export default function DocumentTypeSelector({ selected, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Document Type <span className="text-slate-400">(auto-detected, optional override)</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {DOCUMENT_TYPES.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange(selected === type.value ? null : type.value)}
            className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all
              ${selected === type.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
