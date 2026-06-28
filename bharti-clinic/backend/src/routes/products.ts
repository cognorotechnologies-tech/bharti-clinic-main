import { Router } from 'express';
import { getAllProducts, getProductBySlug, getProductCategories } from '../controllers/product.controller';
import { createReview, getProductReviews } from '../controllers/review.controller';

const router = Router();

// GET /api/products?category&minPrice&maxPrice&sort&page&limit&featured
router.get('/', getAllProducts);

// Backwards-compatible categories endpoint (used by current frontend)
router.get('/categories', getProductCategories);

// Backwards-compatible product reviews endpoints (current frontend)
router.get('/:slug/reviews', getProductReviews);
router.post('/:slug/reviews', createReview);

// GET /api/products/:slug
router.get('/:slug', getProductBySlug);

export default router;

