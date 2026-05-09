const styles = {
  error: 'bg-danger-50 text-danger-600 border-danger-500',
  success: 'bg-success-50 text-success-600 border-success-500',
  warning: 'bg-warning-50 text-warning-600 border-warning-500',
};

export default function Alert({ type = 'error', message }) {
  if (!message) return null;

  return (
    <div className={`px-4 py-3 rounded-lg border-l-4 text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}
