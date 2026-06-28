import { Router } from 'express';
import { getPublishedPosts, getPublishedPostBySlug } from '../controllers/blog.controller';

const router = Router();

// GET /api/blog (published only)
router.get('/', getPublishedPosts);

// GET /api/blog/:slug
router.get('/:slug', getPublishedPostBySlug);

export default router;

