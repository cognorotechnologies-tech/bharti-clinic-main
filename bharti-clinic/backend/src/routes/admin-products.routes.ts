import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as adminProductController from '../controllers/admin-product.controller';

const router = Router();

// All routes require authentication
router.use(verifyToken);

// Products CRUD
router.get('/', adminProductController.getAdminProducts);
router.post('/', adminProductController.createAdminProduct);
router.get('/:id', adminProductController.getAdminProduct);
router.put('/:id', adminProductController.updateAdminProduct);
router.delete('/:id', adminProductController.deleteAdminProduct);

export default router;
