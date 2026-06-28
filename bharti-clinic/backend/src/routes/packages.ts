import { Router } from 'express';
import { getAllPackages, getPackageBySlug } from '../controllers/package.controller';

const router = Router();

// GET /api/packages (include therapies)
router.get('/', getAllPackages);

// GET /api/packages/:slug
router.get('/:slug', getPackageBySlug);

export default router;

