export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password) => {
  return password && password.length >= 8;
};

export const isValidFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png'];
  const maxSize = 10 * 1024 * 1024;
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG and PNG files are supported' };
  }
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be under 10MB' };
  }
  return { valid: true, error: null };
};
