import { Router } from 'express';
import { getAllProducts, getProductBySlug, getProductCategories } from '../controllers/product.controller';
import { getProductReviews, createReview } from '../controllers/review.controller';

const router = Router();

router.get('/', getAllProducts);
router.get('/categories', getProductCategories);
router.get('/:slug', getProductBySlug);
router.get('/:slug/reviews', getProductReviews);
router.post('/:slug/reviews', createReview);

export default router;
