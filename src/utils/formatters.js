export const formatDate = (isoString) => {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatConfidence = (value) => {
  if (value == null) return '—';
  return `${(value * 100).toFixed(1)}%`;
};

export const truncateUUID = (uuid) => {
  if (!uuid) return '—';
  return uuid.substring(0, 8);
};

export const formatFieldName = (key) => {
  if (!key) return '';
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
