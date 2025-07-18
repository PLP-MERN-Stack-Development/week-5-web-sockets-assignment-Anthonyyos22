import { useState, useEffect } from 'react';

export default function MessageInput({ socket, username }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let typingTimeout;

    if (message && !isTyping) {
      setIsTyping(true);
      socket.emit('typing', username);
    } else if (!message && isTyping) {
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
        socket.emit('stop_typing', username);
      }, 2000);
    }

    return () => clearTimeout(typingTimeout);
  }, [message, isTyping, socket, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      sender: username,
      content: message,
      timestamp: new Date().toISOString()
    };

    socket.emit('send_message', messageData);
    setMessage('');
    setIsTyping(false);
    socket.emit('stop_typing', username);
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}