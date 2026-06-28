import { Router } from 'express';
import { getAllTherapies, getTherapyBySlug } from '../controllers/therapy.controller';

const router = Router();

router.get('/', getAllTherapies);
router.get('/:slug', getTherapyBySlug);

export default router;
