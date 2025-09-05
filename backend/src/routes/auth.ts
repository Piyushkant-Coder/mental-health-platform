import express from 'express';
import type { Request, Response, Router } from 'express';
import { register, login } from '../controllers/auth.ts';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
