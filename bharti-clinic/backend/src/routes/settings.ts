import { Router } from 'express';
import { getPublicSettings } from '../controllers/settings.controller';

const router = Router();

// GET /api/settings/public
router.get('/public', getPublicSettings);

export default router;

