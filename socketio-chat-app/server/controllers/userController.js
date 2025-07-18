export class UserController {
  constructor(io) {
    this.io = io;
  }

  handleConnection(socket) {
    socket.on('get_active_users', (callback) => {
      const users = Array.from(this.io.sockets.sockets.values())
        .map(s => s.user)
        .filter(Boolean);
      callback(users);
    });
  }
}