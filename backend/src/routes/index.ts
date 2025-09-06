import { Router } from 'express';
import authRouter from './auth.ts';
import appointmentsRouter from './appointments.ts';
import usersRouter from './users.ts';
import forumRouter from './forum';

import type { Router as ExpressRouter } from 'express';
const router: ExpressRouter = Router();

router.use('/auth', authRouter);
router.use('/appointments', appointmentsRouter);
router.use('/users', usersRouter);
router.use('/forum', forumRouter);

export default router;
