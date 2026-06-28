import { Router } from 'express';
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getNotificationSummary,
} from '../controllers/notifications.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.get('/', verifyToken, getNotifications);
router.get('/summary', verifyToken, getNotificationSummary);
router.patch('/:id/read', verifyToken, markAsRead);
router.patch('/read-all', verifyToken, markAllAsRead);
router.delete('/:id', verifyToken, deleteNotification);

export default router;
