import { Router } from 'express';
import { verifyToken } from '../middleware/auth';
import * as adminInventoryController from '../controllers/admin-inventory.controller';

const router = Router();

// All routes require authentication
router.use(verifyToken);

// Inventory routes
router.get('/', adminInventoryController.getAllInventory);
router.post('/log', adminInventoryController.createInventoryLog);
router.get('/logs', adminInventoryController.getInventoryLogs);

export default router;
