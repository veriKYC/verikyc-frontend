import { useState, useRef } from 'react';
import { isValidFile } from '../../utils/validators';
import ImagePreview from './ImagePreview';

export default function DocumentUploader({ file, onFileChange }) {
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (f) => {
    const result = isValidFile(f);
    if (!result.valid) {
      setError(result.error);
      return;
    }
    setError('');
    onFileChange(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Document Image <span className="text-danger-500">*</span>
      </label>

      {file ? (
        <ImagePreview
          src={URL.createObjectURL(file)}
          onRemove={() => onFileChange(null)}
          label={file.name}
        />
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setIsDragging(false)}
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors
            ${isDragging
              ? 'border-primary-400 bg-primary-50'
              : 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'
            }`}
        >
          <svg className="w-10 h-10 text-slate-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <p className="text-sm text-slate-600 font-medium">
            Drag and drop your document here
          </p>
          <p className="text-xs text-slate-400 mt-1">
            JPEG or PNG, max 10MB
          </p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files[0];
          if (f) handleFile(f);
        }}
      />

      {error && <p className="mt-2 text-sm text-danger-600">{error}</p>}
    </div>
  );
}
