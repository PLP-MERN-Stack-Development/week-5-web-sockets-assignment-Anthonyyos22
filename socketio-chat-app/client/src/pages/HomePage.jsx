export default function HomePage({ setPage }) {
  return (
    <div className="home-page">
      <h1>Welcome to Socket.io Chat</h1>
      <div className="button-group">
        <button onClick={() => setPage('auth')}>Login/Register</button>
        <button onClick={() => setPage('chat')}>Join as Guest</button>
      </div>
    </div>
  )
}