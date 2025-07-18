export class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.connectedAt = new Date();
    this.lastActive = new Date();
    this.status = 'online';
  }

  updateStatus() {
    this.lastActive = new Date();
  }

  setOffline() {
    this.status = 'offline';
    this.lastActive = new Date();
  }
}