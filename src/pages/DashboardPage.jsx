import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDocuments } from '../api/documents';
import VerificationCard from '../components/dashboard/VerificationCard';
import Pagination from '../components/dashboard/Pagination';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';
import Alert from '../components/common/Alert';

export default function DashboardPage() {
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      try {
        const data = await listDocuments(page, 9);
        setDocuments(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocuments();
  }, [page]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">My Verifications</h1>
          <p className="text-sm text-slate-500 mt-1">View and manage your document verifications</p>
        </div>
        <Link to="/upload">
          <Button>New Verification</Button>
        </Link>
      </div>

      {error && <Alert type="error" message={error} />}

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-700 mb-1">No documents yet</h3>
          <p className="text-slate-500 mb-4">Upload your first document to get started</p>
          <Link to="/upload">
            <Button>Upload Document</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => (
              <VerificationCard key={doc.id} document={doc} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}
