import { useEffect, useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import Message from './Message';
import MessageInput from './MessageInput';
import UserList from './UserList';

export default function ChatContainer({ username }) {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    if (!socket || !username) return;

    // Initialize socket connection
    socket.connect();
    socket.emit('register_user', username);

    // Message event handler
    const handleNewMessage = (message) => {
      setMessages(prev => [...prev, message]);
    };

    // User list event handler
    const handleUserList = (userList) => {
      setUsers(userList);
    };

    // Typing event handler
    const handleTypingUsers = (users) => {
      setTypingUsers(users);
    };

    // Register event listeners
    socket.on('receive_message', handleNewMessage);
    socket.on('user_list', handleUserList);
    socket.on('typing_users', handleTypingUsers);

    // Cleanup function
    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('user_list', handleUserList);
      socket.off('typing_users', handleTypingUsers);
      socket.disconnect();
    };
  }, [socket, username]);

  return (
    <div className="chat-container">
      <UserList users={users} />
      <div className="messages">
        {messages.map((msg, i) => (
          <Message key={`msg-${i}-${msg.timestamp}`} message={msg} currentUser={username} />
        ))}
      </div>
      <MessageInput socket={socket} username={username} />
      {typingUsers.length > 0 && (
        <div className="typing-indicator">
          {typingUsers.join(', ')} {typingUsers.length > 1 ? 'are' : 'is'} typing...
        </div>
      )}
    </div>
  );
}