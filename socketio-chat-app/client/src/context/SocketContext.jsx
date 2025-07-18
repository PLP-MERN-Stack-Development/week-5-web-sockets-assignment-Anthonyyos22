import { createContext, useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
    autoConnect: false,
    withCredentials: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);