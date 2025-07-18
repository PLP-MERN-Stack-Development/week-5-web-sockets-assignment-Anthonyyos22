export const validateMessage = (message) => {
  if (!message || message.trim() === '') {
    return { valid: false, error: 'Message cannot be empty' };
  }
  if (message.length > 500) {
    return { valid: false, error: 'Message is too long (max 500 characters)' };
  }
  return { valid: true };
};