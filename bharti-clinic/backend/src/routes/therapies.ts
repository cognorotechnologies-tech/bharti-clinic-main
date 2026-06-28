import { Router } from 'express';
import { getAllTherapies, getTherapyBySlug } from '../controllers/therapy.controller';

const router = Router();

// GET /api/therapies?category&featured
router.get('/', getAllTherapies);

// GET /api/therapies/:slug
router.get('/:slug', getTherapyBySlug);

export default router;

