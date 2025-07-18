let messages = [];

export const addMessage = (message) => {
  messages.push(message);
  if (messages.length > 100) messages.shift();
};

export const getMessages = () => {
  return Promise.resolve([...messages]);
};

export const clearMessages = () => {
  messages = [];
};