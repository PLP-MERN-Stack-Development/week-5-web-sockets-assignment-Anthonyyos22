export class AuthController {
  constructor(io) {
    this.io = io;
    this.users = new Map();
  }

  handleConnection(socket) {
    socket.on('register_user', (username) => {
      this.handleUserRegistration(socket, username);
    });

    socket.on('disconnect', () => {
      this.handleUserDisconnect(socket);
    });
  }

  handleUserRegistration(socket, username) {
    if (!username || username.trim() === '') {
      socket.emit('registration_error', 'Username is required');
      return;
    }

    const user = {
      id: socket.id,
      username: username.trim(),
      joinedAt: new Date()
    };

    this.users.set(socket.id, user);
    this.io.emit('user_list', Array.from(this.users.values()));
    this.io.emit('user_joined', user);
  }

  handleUserDisconnect(socket) {
    const user = this.users.get(socket.id);
    if (user) {
      this.users.delete(socket.id);
      this.io.emit('user_left', user);
      this.io.emit('user_list', Array.from(this.users.values()));
    }
  }
}