import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadDocument } from '../api/documents';
import DocumentUploader from '../components/upload/DocumentUploader';
import SelfieCapture from '../components/upload/SelfieCapture';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Card from '../components/common/Card';

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a document image');
      return;
    }

    setIsSubmitting(true);
    setError('');
    try {
      const result = await uploadDocument(file, selfie);
      navigate(`/documents/${result.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Upload Document</h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload a document image for AI-powered verification
        </p>
      </div>

      <Card className="p-6 max-w-2xl">
        <Alert type="error" message={error} />

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <DocumentUploader file={file} onFileChange={setFile} />
          <SelfieCapture selfie={selfie} onSelfieChange={setSelfie} />

          <div className="pt-4 border-t border-slate-100">
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={!file}
              size="lg"
              className="w-full sm:w-auto"
            >
              Submit for Verification
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
