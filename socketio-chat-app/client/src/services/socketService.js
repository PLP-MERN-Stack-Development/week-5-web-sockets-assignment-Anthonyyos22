import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
  autoConnect: false,
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000
})

export const connectSocket = (username) => {
  if (!socket.connected) {
    socket.connect()
    if (username) {
      socket.emit('register_user', username)
    }
  }
}

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect()
  }
}

export const sendMessage = (message) => {
  socket.emit('send_message', message)
}

export const sendPrivateMessage = (to, message) => {
  socket.emit('private_message', { to, message })
}

export const setTypingStatus = (isTyping) => {
  socket.emit('typing', isTyping)
}

export default socket