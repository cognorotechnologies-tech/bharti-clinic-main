import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';
import { Decimal } from '@prisma/client/runtime/library';

// Get all orders
export async function getAdminOrders(req: Request, res: Response) {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
        const search = (req.query.search as string)?.trim();
        const status = (req.query.status as string)?.trim();

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { patientName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.status = status;
        }

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            prisma.order.count({ where }),
        ]);

        return sendSuccess(res, {
            orders: orders.map((o) => ({
                ...o,
                totalAmount: parseFloat(o.totalAmount.toString()),
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get admin orders error:', error);
        return sendError(res, 500, 'Failed to fetch orders');
    }
}

// Get single order
export async function getAdminOrder(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const order = await prisma.order.findUnique({ where: { id } });

        if (!order) {
            return sendError(res, 404, 'Order not found');
        }

        return sendSuccess(res, {
            ...order,
            totalAmount: parseFloat(order.totalAmount.toString()),
        });
    } catch (error) {
        console.error('Get admin order error:', error);
        return sendError(res, 500, 'Failed to fetch order');
    }
}

// Update order status
export async function updateAdminOrderStatus(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { status } = req.body;

        if (!['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'].includes(status)) {
            return sendError(res, 400, 'Invalid order status');
        }

        const order = await prisma.order.findUnique({ where: { id } });
        if (!order) {
            return sendError(res, 404, 'Order not found');
        }

        const updated = await prisma.order.update({
            where: { id },
            data: { status },
        });

        return sendSuccess(res, {
            ...updated,
            totalAmount: parseFloat(updated.totalAmount.toString()),
        });
    } catch (error) {
        console.error('Update order status error:', error);
        return sendError(res, 500, 'Failed to update order');
    }
}
