import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useSocket } from '../context/SocketContext'
import '../styles/auth.css'

export default function AuthPage({ setPage, setUsername }) {
  const [authMode, setAuthMode] = useState('login')
  const [formData, setFormData] = useState({ username: '', password: '' })
  const { login } = useAuth()
  const socket = useSocket()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData.username)
    setUsername(formData.username)
    socket.emit('register_user', formData.username)
    setPage('chat')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{authMode === 'login' ? 'Login' : 'Register'}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
          {authMode === 'register' && (
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          )}
          <button type="submit">{authMode === 'login' ? 'Login' : 'Register'}</button>
        </form>
        <p>
          {authMode === 'login' 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <span onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
            {authMode === 'login' ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}