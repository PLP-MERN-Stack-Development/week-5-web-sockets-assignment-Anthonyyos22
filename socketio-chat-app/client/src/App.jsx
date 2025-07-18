import { useState } from 'react'
import { SocketProvider } from './context/SocketContext'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import AuthPage from './pages/AuthPage'
import './styles/global.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [username, setUsername] = useState('')

  return (
    <AuthProvider>
      <SocketProvider>
        <div className="app-container">
          {currentPage === 'home' && <HomePage setPage={setCurrentPage} />}
          {currentPage === 'auth' && <AuthPage setPage={setCurrentPage} setUsername={setUsername} />}
          {currentPage === 'chat' && <ChatPage setPage={setCurrentPage} username={username} />}
        </div>
      </SocketProvider>
    </AuthProvider>
  )
}

export default App