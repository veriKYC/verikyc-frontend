import { useState, useRef, useCallback } from 'react';
import ImagePreview from './ImagePreview';
import Button from '../common/Button';

export default function SelfieCapture({ selfie, onSelfieChange }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
      setCameraError(false);
    } catch {
      setCameraError(true);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  const capture = useCallback(() => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
      onSelfieChange(file);
      stopCamera();
    }, 'image/jpeg', 0.9);
  }, [onSelfieChange, stopCamera]);

  const removeSelfie = () => {
    onSelfieChange(null);
    stopCamera();
  };

  if (selfie) {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Selfie <span className="text-slate-400">(optional)</span>
        </label>
        <ImagePreview
          src={URL.createObjectURL(selfie)}
          onRemove={removeSelfie}
          label="Selfie captured"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Selfie <span className="text-slate-400">(optional)</span>
      </label>

      {cameraActive ? (
        <div className="space-y-3">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-w-xs rounded-lg border border-slate-200"
          />
          <div className="flex gap-2">
            <Button onClick={capture} size="sm">Capture</Button>
            <Button onClick={stopCamera} variant="secondary" size="sm">Cancel</Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          {!cameraError && (
            <Button onClick={startCamera} variant="secondary" size="sm">
              Open Camera
            </Button>
          )}
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="secondary"
            size="sm"
          >
            {cameraError ? 'Upload Selfie' : 'Upload File'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) onSelfieChange(f);
            }}
          />
        </div>
      )}

      {cameraError && (
        <p className="text-xs text-slate-400 mt-2">Camera not available. Use file upload instead.</p>
      )}
    </div>
  );
}
