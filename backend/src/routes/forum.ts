import express, { Router, Request, Response } from 'express';
import ForumPost from '../models/ForumPost';
import { authenticateJWT } from '../middlewares/authMiddleware';

interface AuthRequest extends Request {
  user?: any;
}

const router: Router = express.Router();

// Create a new forum post
router.post('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user?._id;
    const post = await ForumPost.create({ user: userId, content });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Get all forum posts
router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await ForumPost.find().populate('user', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

export default router;
