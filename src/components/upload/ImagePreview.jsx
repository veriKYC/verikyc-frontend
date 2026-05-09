export default function ImagePreview({ src, onRemove, label }) {
  return (
    <div className="relative inline-block">
      <img
        src={src}
        alt={label || 'Preview'}
        className="w-full max-w-xs rounded-lg border border-slate-200 object-cover"
      />
      {onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 w-6 h-6 bg-danger-500 text-white rounded-full
            flex items-center justify-center text-xs hover:bg-danger-600 transition-colors"
        >
          x
        </button>
      )}
      {label && (
        <span className="block text-xs text-slate-500 mt-1 text-center">{label}</span>
      )}
    </div>
  );
}
