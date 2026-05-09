import { useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocument } from '../api/documents';
import { usePolling } from '../hooks/usePolling';
import { TERMINAL_STATUSES } from '../utils/constants';
import { formatDate } from '../utils/formatters';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';
import StatusBadge from '../components/results/StatusBadge';
import PipelineProgress from '../components/results/PipelineProgress';
import Button from '../components/common/Button';

export default function DocumentStatusPage() {
  const { id } = useParams();

  const fetchFn = useCallback(() => getDocument(id), [id]);
  const shouldStop = useCallback((data) => TERMINAL_STATUSES.includes(data?.status), []);

  const { data: document, isLoading, error } = usePolling(fetchFn, 3000, shouldStop);

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

  const isTerminal = TERMINAL_STATUSES.includes(document?.status);
  const isVerified = document?.status === 'VERIFIED';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Verification Status</h1>
        <p className="text-sm text-slate-500 mt-1">Tracking document verification progress</p>
      </div>

      <Card className="p-6 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-slate-400 font-mono mb-1">Document ID: {id}</p>
            {document?.documentType && (
              <p className="text-sm font-medium text-slate-700">{document.documentType}</p>
            )}
          </div>
          <StatusBadge status={document?.status} />
        </div>

        <div className="mb-6">
          <PipelineProgress status={document?.status} />
        </div>

        <div className="border-t border-slate-100 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">Uploaded</span>
            <span className="text-slate-700">{formatDate(document?.createdAt)}</span>
          </div>
          {document?.updatedAt && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Last Updated</span>
              <span className="text-slate-700">{formatDate(document.updatedAt)}</span>
            </div>
          )}
        </div>

        {!isTerminal && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span className="text-sm text-blue-700">Processing your document... This page refreshes automatically.</span>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="mt-6">
            <Link to={`/documents/${id}/results`}>
              <Button size="lg" className="w-full">View Results</Button>
            </Link>
          </div>
        )}

        {document?.status === 'FAILED' && (
          <div className="mt-6">
            <Alert type="error" message="Verification failed. Please try uploading again with a clearer image." />
            <Link to="/upload" className="block mt-3">
              <Button variant="secondary" className="w-full">Try Again</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
