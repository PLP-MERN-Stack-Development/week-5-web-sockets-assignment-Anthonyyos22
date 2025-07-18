import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Controllers
import { AuthController } from './controllers/authController.js';
import { MessageController } from './controllers/messageController.js';
import { UserController } from './controllers/userController.js';

// Routes
import apiRouter from './routes/api.js';

// Config
import socketConfig from './config/socketConfig.js';

// Environment setup
dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, socketConfig);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

// Initialize controllers
const authController = new AuthController(io);
const messageController = new MessageController(io);
const userController = new UserController(io);

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Initialize controllers for this socket
  authController.handleConnection(socket);
  messageController.handleConnection(socket);
  userController.handleConnection(socket);

  // Health check
  socket.on('ping', (callback) => {
    callback('pong');
  });
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});