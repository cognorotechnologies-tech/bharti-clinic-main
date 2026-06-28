import { Router } from 'express';
import { createOrder, getOrderById } from '../controllers/order.controller';

const router = Router();

// POST /api/orders
router.post('/', createOrder);

// Backwards-compatible: order detail (used by confirmation pages)
router.get('/:id', getOrderById);

export default router;

