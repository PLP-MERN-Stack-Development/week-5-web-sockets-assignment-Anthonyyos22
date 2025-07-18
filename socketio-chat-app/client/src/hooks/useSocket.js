import { useEffect, useState } from 'react'
import { useSocket } from '../context/SocketContext'

export default function useSocketEvents() {
  const socket = useSocket()
  const [isConnected, setIsConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [typingUsers, setTypingUsers] = useState([])

  useEffect(() => {
    if (!socket) return

    const onConnect = () => setIsConnected(true)
    const onDisconnect = () => setIsConnected(false)
    const onMessage = (msg) => setMessages(prev => [...prev, msg])
    const onUserList = (list) => setUsers(list)
    const onTyping = (users) => setTypingUsers(users)

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('new_message', onMessage)
    socket.on('user_list', onUserList)
    socket.on('typing_users', onTyping)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('new_message', onMessage)
      socket.off('user_list', onUserList)
      socket.off('typing_users', onTyping)
    }
  }, [socket])

  return { isConnected, messages, users, typingUsers }
}