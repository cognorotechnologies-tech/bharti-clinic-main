import { Router } from 'express';
import {
    getReviews,
    getReviewById,
    createReview,
    updateReviewStatus,
    deleteReview,
    getReviewsStats,
} from '../controllers/reviews.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/', createReview);

// Admin routes (protected)
router.get('/', verifyToken, getReviews);
router.get('/stats', verifyToken, getReviewsStats);
router.get('/:id', verifyToken, getReviewById);
router.patch('/:id/status', verifyToken, updateReviewStatus);
router.delete('/:id', verifyToken, deleteReview);

export default router;
