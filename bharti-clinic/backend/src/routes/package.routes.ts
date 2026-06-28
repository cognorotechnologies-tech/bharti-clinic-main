import { Router } from 'express';
import { getAllPackages, getPackageBySlug } from '../controllers/package.controller';

const router = Router();

router.get('/', getAllPackages);
router.get('/:slug', getPackageBySlug);

export default router;
