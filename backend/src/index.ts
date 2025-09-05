import authRouter from './routes/auth.ts';
import appointmentsRouter from './routes/appointments.ts';
import usersRouter from './routes/users.ts';

import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { connectDB } from './config.ts';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Backend with MongoDB is running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
