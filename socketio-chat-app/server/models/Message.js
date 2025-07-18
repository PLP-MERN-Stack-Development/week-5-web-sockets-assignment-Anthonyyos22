export class Message {
  constructor({ sender, senderId, content, isPrivate = false, recipient = null }) {
    this.id = Date.now();
    this.sender = sender;
    this.senderId = senderId;
    this.content = content;
    this.timestamp = new Date().toISOString();
    this.isPrivate = isPrivate;
    this.recipient = recipient;
  }
}