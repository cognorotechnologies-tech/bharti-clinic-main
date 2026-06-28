import { Router } from 'express';
import { adminGetPendingReviews, adminUpdateReviewStatus } from '../controllers/review.controller';

const router = Router();

router.get('/', adminGetPendingReviews);
router.patch('/:id', adminUpdateReviewStatus);

export default router;
