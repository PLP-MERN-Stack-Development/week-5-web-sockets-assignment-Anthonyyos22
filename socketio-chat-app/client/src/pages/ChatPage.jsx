import { useEffect } from 'react'
import ChatContainer from '../components/Chat/ChatContainer'
import '../styles/chat.css'

export default function ChatPage({ setPage, username }) {
  useEffect(() => {
    if (!username) {
      setPage('auth')
    }
  }, [username, setPage])

  return (
    <div className="chat-page">
      <ChatContainer username={username} />
    </div>
  )
}