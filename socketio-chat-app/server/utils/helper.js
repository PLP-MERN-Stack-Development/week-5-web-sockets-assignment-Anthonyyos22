export const validateUsername = (username) => {
  if (!username || username.trim() === '') {
    return { valid: false, error: 'Username is required' };
  }
  if (username.length < 3 || username.length > 20) {
    return { valid: false, error: 'Username must be between 3-20 characters' };
  }
  return { valid: true };
};

export const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};