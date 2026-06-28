import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get admin notifications with smart aggregation
export const getNotifications = async (req: Request, res: Response) => {
    try {
        const notifications: any[] = [];

        // 1. Pending Reviews (High Priority)
        const pendingReviews = await prisma.review.count({
            where: { status: 'PENDING' }
        });
        if (pendingReviews > 0) {
            notifications.push({
                id: 'pending-reviews',
                type: 'review',
                title: `${pendingReviews} Pending Review${pendingReviews > 1 ? 's' : ''}`,
                message: `You have ${pendingReviews} customer review${pendingReviews > 1 ? 's' : ''} waiting for approval`,
                link: '/admin/reviews',
                read: false,
                createdAt: new Date().toISOString(),
                priority: 'high',
                actionable: true,
                actionLabel: 'Review Now',
            });
        }

        // 2. Low Stock Products (High Priority)
        const lowStockProducts = await prisma.product.findMany({
            where: {
                stock: { lte: 10 }
            },
            select: { id: true, name: true, stock: true }
        });
        if (lowStockProducts.length > 0) {
            notifications.push({
                id: 'low-stock',
                type: 'inventory',
                title: `${lowStockProducts.length} Low Stock Alert${lowStockProducts.length > 1 ? 's' : ''}`,
                message: `${lowStockProducts.length} product${lowStockProducts.length > 1 ? 's are' : ' is'} running low on stock`,
                link: '/admin/inventory',
                read: false,
                createdAt: new Date().toISOString(),
                priority: 'high',
                actionable: true,
                actionLabel: 'Restock',
            });
        }

        // 3. Pending Orders (Medium Priority)
        const pendingOrders = await prisma.order.count({
            where: { status: 'PENDING' }
        });
        if (pendingOrders > 0) {
            notifications.push({
                id: 'pending-orders',
                type: 'order',
                title: `${pendingOrders} Pending Order${pendingOrders > 1 ? 's' : ''}`,
                message: `${pendingOrders} order${pendingOrders > 1 ? 's need' : ' needs'} to be processed`,
                link: '/admin/orders',
                read: false,
                createdAt: new Date().toISOString(),
                priority: 'medium',
                actionable: true,
                actionLabel: 'Process Orders',
            });
        }

        // 4. Today's Appointments (Medium Priority)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const todayAppointments = await prisma.appointment.count({
            where: {
                preferredDate: {
                    gte: today,
                    lt: tomorrow
                },
                status: { in: ['PENDING', 'CONFIRMED'] }
            }
        });
        if (todayAppointments > 0) {
            notifications.push({
                id: 'today-appointments',
                type: 'appointment',
                title: `${todayAppointments} Appointment${todayAppointments > 1 ? 's' : ''} Today`,
                message: `You have ${todayAppointments} appointment${todayAppointments > 1 ? 's' : ''} scheduled for today`,
                link: '/admin/appointments',
                read: false,
                createdAt: new Date().toISOString(),
                priority: 'medium',
                actionable: true,
                actionLabel: 'View Schedule',
            });
        }

        // 5. Unread Contact Messages (Low Priority)
        const unreadMessages = await prisma.contactMessage.count({
            where: { isRead: false }
        });
        if (unreadMessages > 0) {
            notifications.push({
                id: 'unread-messages',
                type: 'system',
                title: `${unreadMessages} New Message${unreadMessages > 1 ? 's' : ''}`,
                message: `${unreadMessages} customer${unreadMessages > 1 ? 's have' : ' has'} sent you a message`,
                link: '/admin/settings',
                read: false,
                createdAt: new Date().toISOString(),
                priority: 'low',
                actionable: true,
                actionLabel: 'Read Messages',
            });
        }

        // 6. Recent Orders (Last 24 hours) - Low Priority
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const recentOrders = await prisma.order.count({
            where: {
                createdAt: { gte: yesterday }
            }
        });
        if (recentOrders > 0) {
            notifications.push({
                id: 'recent-orders',
                type: 'order',
                title: `${recentOrders} New Order${recentOrders > 1 ? 's' : ''} (24h)`,
                message: `You received ${recentOrders} new order${recentOrders > 1 ? 's' : ''} in the last 24 hours`,
                link: '/admin/orders',
                read: false,
                createdAt: new Date().toISOString(),
                priority: 'low',
            });
        }

        res.json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notifications',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Mark notification as read (dummy implementation - in real app, store in DB)
export const markAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        // In a real implementation, you'd update a notifications table
        // For now, just return success
        res.json({
            success: true,
            message: 'Notification marked as read',
        });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark notification as read',
        });
    }
};

// Mark all as read
export const markAllAsRead = async (req: Request, res: Response) => {
    try {
        res.json({
            success: true,
            message: 'All notifications marked as read',
        });
    } catch (error) {
        console.error('Error marking all as read:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to mark all as read',
        });
    }
};

// Delete notification
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        res.json({
            success: true,
            message: 'Notification deleted',
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete notification',
        });
    }
};

// Get notification summary (for badge count)
export const getNotificationSummary = async (req: Request, res: Response) => {
    try {
        const [pendingReviews, lowStock, pendingOrders, todayAppointments] = await Promise.all([
            prisma.review.count({ where: { status: 'PENDING' } }),
            prisma.product.count({ where: { stock: { lte: 10 } } }),
            prisma.order.count({ where: { status: 'PENDING' } }),
            prisma.appointment.count({
                where: {
                    preferredDate: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                        lt: new Date(new Date().setHours(23, 59, 59, 999))
                    },
                    status: { in: ['PENDING', 'CONFIRMED'] }
                }
            })
        ]);

        const total = pendingReviews + lowStock + pendingOrders + todayAppointments;

        res.json({
            success: true,
            data: {
                total,
                breakdown: {
                    pendingReviews,
                    lowStock,
                    pendingOrders,
                    todayAppointments,
                }
            }
        });
    } catch (error) {
        console.error('Error fetching notification summary:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch notification summary',
        });
    }
};
