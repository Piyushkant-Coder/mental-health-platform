import mainRouter from './routes/index';

import express from 'express';
import http from 'http';
import type { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './config.ts';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', mainRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend with MongoDB is running!');
});

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Adjust for production
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
