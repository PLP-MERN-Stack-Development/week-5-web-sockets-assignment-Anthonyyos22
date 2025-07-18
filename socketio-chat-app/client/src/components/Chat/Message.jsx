export default function Message({ message, currentUser }) {
  const isCurrentUser = message.sender === currentUser

  return (
    <div className={`message ${isCurrentUser ? 'current-user' : ''}`}>
      {!isCurrentUser && <span className="sender">{message.sender}</span>}
      <div className="content">{message.content}</div>
      <span className="timestamp">
        {new Date(message.timestamp).toLocaleTimeString()}
      </span>
    </div>
  )
}