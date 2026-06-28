import { Router } from 'express';
import { getGalleryItems } from '../controllers/gallery.controller';

const router = Router();

// GET /api/gallery?type&category&limit
router.get('/', getGalleryItems);

export default router;

