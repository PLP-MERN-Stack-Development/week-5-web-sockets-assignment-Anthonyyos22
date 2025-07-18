const users = new Map();

export const addUser = (socketId, username) => {
  users.set(socketId, { id: socketId, username, joinedAt: new Date() });
};

export const removeUser = (socketId) => {
  users.delete(socketId);
};

export const getUsers = () => {
  return Promise.resolve(Array.from(users.values()));
};