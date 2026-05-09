import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocument, getResults } from '../api/documents';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';
import StatusBadge from '../components/results/StatusBadge';
import ExtractedFieldsTable from '../components/results/ExtractedFieldsTable';
import GovernmentVerificationCard from '../components/results/GovernmentVerificationCard';
import { formatDate, formatConfidence } from '../utils/formatters';

export default function ResultsPage() {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doc, res] = await Promise.all([
          getDocument(id),
          getResults(id),
        ]);
        setDocument(doc);
        setResults(res);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load results');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Verification Results</h1>
          <p className="text-sm text-slate-500 mt-1">
            Document ID: <span className="font-mono">{id}</span>
          </p>
        </div>
        <Link to="/dashboard">
          <button className="text-sm text-slate-600 hover:text-slate-800 font-medium">
            Back to Dashboard
          </button>
        </Link>
      </div>

      <div className="space-y-6 max-w-3xl">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">Document Info</h2>
            <StatusBadge status={document?.status} />
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Document Type</span>
              <p className="font-medium text-slate-800 mt-0.5">{document?.documentType || '—'}</p>
            </div>
            <div>
              <span className="text-slate-500">Classification Confidence</span>
              <p className="font-medium text-slate-800 mt-0.5">
                {formatConfidence(results?.confidenceScores?.classification)}
              </p>
            </div>
            <div>
              <span className="text-slate-500">Uploaded</span>
              <p className="font-medium text-slate-800 mt-0.5">{formatDate(document?.createdAt)}</p>
            </div>
            <div>
              <span className="text-slate-500">Verified</span>
              <p className="font-medium text-slate-800 mt-0.5">{formatDate(results?.createdAt)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Extracted Fields</h2>
          <ExtractedFieldsTable
            extractedFields={results?.extractedFields}
            confidenceScores={results?.confidenceScores}
          />
        </Card>

        {document?.documentType && (
          <GovernmentVerificationCard documentType={document.documentType} />
        )}
      </div>
    </div>
  );
}
