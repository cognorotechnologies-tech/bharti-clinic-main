import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma';
import { generateAdminToken } from '../middleware/auth';
import { sendSuccess, sendError } from '../lib/http';
import { Decimal } from '@prisma/client/runtime/library';

// Admin Login
export async function adminLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body as { email?: string; password?: string };

        if (!email || !password) {
            return sendError(res, 400, 'Email and password are required');
        }

        const admin = await prisma.user.findUnique({
            where: { email },
        });

        if (!admin || !['ADMIN', 'STAFF'].includes(admin.role)) {
            return sendError(res, 401, 'Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
        if (!passwordMatch) {
            return sendError(res, 401, 'Invalid credentials');
        }

        const token = generateAdminToken({
            id: admin.id,
            email: admin.email,
            role: admin.role,
        });

        return sendSuccess(res, {
            token,
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error('Admin login error:', error);
        return sendError(res, 500, 'Internal server error');
    }
}

// Get Dashboard KPIs
export async function getDashboardKPI(req: Request, res: Response) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // Revenue Today
        const orderToday = await prisma.order.findMany({
            where: {
                createdAt: {
                    gte: today,
                    lt: tomorrow,
                },
                paymentStatus: 'PAID',
            },
        });
        const revenueToday = orderToday.reduce((sum, order) => {
            return sum + parseFloat(order.totalAmount.toString());
        }, 0);

        // Pending Orders
        const pendingOrders = await prisma.order.count({
            where: { status: 'PENDING' },
        });

        // Appointments Today
        const appointmentsToday = await prisma.appointment.count({
            where: {
                preferredDate: {
                    equals: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                },
                status: { in: ['PENDING', 'CONFIRMED'] },
            },
        });

        // Low Stock Alerts (threshold check)
        const lowStockProducts = await prisma.product.findMany({
            where: {
                stock: { lte: 5 }, // Threshold of 5 units
            },
        });
        const lowStockAlerts = lowStockProducts.length;

        return sendSuccess(res, {
            revenueToday: Math.round(revenueToday * 100) / 100,
            pendingOrders,
            appointmentsToday,
            lowStockAlerts,
        });
    } catch (error) {
        console.error('Dashboard KPI error:', error);
        return sendError(res, 500, 'Failed to fetch KPI data');
    }
}

// Get Revenue Data (Last 7 Days)
export async function getRevenueData(req: Request, res: Response) {
    try {
        const data = [];
        const today = new Date();

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const orders = await prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: date,
                        lt: nextDate,
                    },
                    paymentStatus: 'PAID',
                },
            });

            const revenue = orders.reduce((sum, order) => {
                return sum + parseFloat(order.totalAmount.toString());
            }, 0);

            data.push({
                date: date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
                revenue: Math.round(revenue * 100) / 100,
            });
        }

        return sendSuccess(res, data);
    } catch (error) {
        console.error('Revenue data error:', error);
        return sendError(res, 500, 'Failed to fetch revenue data');
    }
}

// Get Orders Dashboard Data
export async function getOrdersData(req: Request, res: Response) {
    try {
        // Order Status Distribution
        const orderCounts = await prisma.order.groupBy({
            by: ['status'],
            _count: true,
        });

        const statusData = orderCounts.map((item) => ({
            name: item.status,
            value: item._count,
        }));

        // Recent Orders (last 5)
        const recentOrders = await prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        });

        return sendSuccess(res, {
            statusData,
            recentOrders: recentOrders.map((order) => ({
                id: order.id,
                patientName: order.patientName,
                totalAmount: parseFloat(order.totalAmount.toString()),
                status: order.status,
                createdAt: order.createdAt,
            })),
        });
    } catch (error) {
        console.error('Orders data error:', error);
        return sendError(res, 500, 'Failed to fetch orders data');
    }
}

// Get Appointments Data
export async function getAppointmentsData(req: Request, res: Response) {
    try {
        const appointments = await prisma.appointment.findMany({
            take: 5,
            orderBy: { preferredDate: 'asc' },
            include: { therapy: true },
            where: {
                status: { in: ['PENDING', 'CONFIRMED'] },
            },
        });

        return sendSuccess(
            res,
            appointments.map((apt) => ({
                id: apt.id,
                patientName: apt.patientName,
                therapy: apt.therapy.name,
                dateTime: `${apt.preferredDate.toLocaleDateString('en-IN')} ${apt.preferredTime}`,
                status: apt.status,
            }))
        );
    } catch (error) {
        console.error('Appointments data error:', error);
        return sendError(res, 500, 'Failed to fetch appointments data');
    }
}

// Get Low Stock Items
export async function getLowStockItems(req: Request, res: Response) {
    try {
        const lowStockProducts = await prisma.product.findMany({
            where: {
                stock: { lte: 5 },
            },
            select: {
                id: true,
                name: true,
                stock: true,
            },
        });

        return sendSuccess(
            res,
            lowStockProducts.map((product) => ({
                productId: product.id,
                productName: product.name,
                currentStock: product.stock,
                threshold: 5,
            }))
        );
    } catch (error) {
        console.error('Low stock error:', error);
        return sendError(res, 500, 'Failed to fetch low stock items');
    }
}
