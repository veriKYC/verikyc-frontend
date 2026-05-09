import { formatFieldName } from '../../utils/formatters';
import ConfidenceBar from './ConfidenceBar';

export default function ExtractedFieldsTable({ extractedFields, confidenceScores }) {
  if (!extractedFields || Object.keys(extractedFields).length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 text-sm">
        No fields extracted
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Field</th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium">Value</th>
            <th className="text-left py-3 px-4 text-slate-500 font-medium w-48">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(extractedFields).map(([key, value]) => (
            <tr key={key} className="border-b border-slate-50 hover:bg-slate-50">
              <td className="py-3 px-4 text-slate-600 font-medium">
                {formatFieldName(key)}
              </td>
              <td className="py-3 px-4 text-slate-800 font-mono text-sm">
                {value || <span className="text-slate-300">—</span>}
              </td>
              <td className="py-3 px-4">
                <ConfidenceBar value={confidenceScores?.[key]} label={true} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
