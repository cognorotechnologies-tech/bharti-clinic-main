import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as adminOrderController from '../controllers/admin-order.controller';

const router = Router();

router.use(verifyToken);

router.get('/', adminOrderController.getAdminOrders);
router.get('/:id', adminOrderController.getAdminOrder);
router.patch('/:id/status', adminOrderController.updateAdminOrderStatus);

export default router;
