import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as adminBlogController from '../controllers/admin-blog.controller';

const router = Router();

console.log('🔧 Admin blog routes module loaded');

// All routes require authentication
router.use(verifyToken);

// GET /api/admin/blog - List all posts (including drafts)
router.get('/', adminBlogController.getAllPosts);
console.log('  ✓ GET /api/admin/blog');

// GET /api/admin/blog/:id - Get single post by ID
router.get('/:id', adminBlogController.getPostById);
console.log('  ✓ GET /api/admin/blog/:id');

// POST /api/admin/blog - Create new post
router.post('/', adminBlogController.createPost);
console.log('  ✓ POST /api/admin/blog');

// PUT /api/admin/blog/:id - Update post
router.put('/:id', adminBlogController.updatePost);
console.log('  ✓ PUT /api/admin/blog/:id');

// DELETE /api/admin/blog/:id - Delete post
router.delete('/:id', adminBlogController.deletePost);
console.log('  ✓ DELETE /api/admin/blog/:id');

export default router;
