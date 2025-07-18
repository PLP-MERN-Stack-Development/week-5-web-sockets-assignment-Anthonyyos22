export class MessageController {
  constructor(io) {
    this.io = io;
    this.messages = [];
    this.typingUsers = new Set();
  }

  handleConnection(socket) {
    socket.on('send_message', (messageData) => {
      this.handleNewMessage(socket, messageData);
    });

    socket.on('typing', (isTyping) => {
      this.handleTyping(socket, isTyping);
    });

    socket.on('private_message', (data) => {
      this.handlePrivateMessage(socket, data);
    });
  }

  handleNewMessage(socket, { message }) {
    const user = this.io.sockets.sockets.get(socket.id)?.user;
    if (!user || !message) return;

    const messageObj = {
      id: Date.now(),
      sender: user.username,
      senderId: socket.id,
      content: message,
      timestamp: new Date().toISOString()
    };

    this.messages.push(messageObj);
    if (this.messages.length > 100) this.messages.shift();

    this.io.emit('new_message', messageObj);
  }

  handleTyping(socket, isTyping) {
    const user = this.io.sockets.sockets.get(socket.id)?.user;
    if (!user) return;

    if (isTyping) {
      this.typingUsers.add(user.username);
    } else {
      this.typingUsers.delete(user.username);
    }

    this.io.emit('typing_users', Array.from(this.typingUsers));
  }

  handlePrivateMessage(socket, { to, message }) {
    const sender = this.io.sockets.sockets.get(socket.id)?.user;
    const recipientSocket = Array.from(this.io.sockets.sockets.values())
      .find(s => s.user?.username === to);

    if (!sender || !recipientSocket || !message) return;

    const privateMessage = {
      id: Date.now(),
      from: sender.username,
      fromId: socket.id,
      to,
      content: message,
      timestamp: new Date().toISOString(),
      isPrivate: true
    };

    socket.emit('private_message', privateMessage);
    recipientSocket.emit('private_message', privateMessage);
  }
}