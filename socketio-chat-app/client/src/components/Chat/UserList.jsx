export default function UserList({ users }) {
  return (
    <div className="user-list">
      <h3>Online Users ({users.length})</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span className="username">{user.username}</span>
            <span className="status-indicator"></span>
          </li>
        ))}
      </ul>
    </div>
  )
}