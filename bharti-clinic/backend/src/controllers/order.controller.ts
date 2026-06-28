import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendCreated, sendError, sendSuccess } from '../lib/http';

const orderItemSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.coerce.number().int().min(1),
});

const createOrderSchema = z.object({
    patientName: z.string().trim().min(1),
    phone: z.string().trim().min(10),
    email: z.string().trim().email(),
    items: z.array(orderItemSchema).min(1),
    shippingAddress: z.object({
        line1: z.string().trim().min(1),
        line2: z.string().trim().optional(),
        city: z.string().trim().min(1),
        state: z.string().trim().min(1),
        pinCode: z.string().trim().min(4),
    }),
    paymentMethod: z.string().trim().min(1),
    // Optional client-provided total (we will compute our own)
    totalAmount: z.coerce.number().nonnegative().optional(),
});

export const createOrder = async (req: Request, res: Response) => {
    try {
        const parsed = createOrderSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid request body', parsed.error.flatten());
        }

        const { patientName, phone, email, items, shippingAddress, paymentMethod } = parsed.data;
        const productIds = Array.from(new Set(items.map((i) => i.productId)));

        const order = await prisma.$transaction(async (tx) => {
            const products = await tx.product.findMany({
                where: { id: { in: productIds }, isActive: true },
                select: { id: true, name: true, price: true, stock: true },
            });

            const byId = new Map(products.map((p) => [p.id, p]));

            for (const item of items) {
                const p = byId.get(item.productId);
                if (!p) {
                    throw Object.assign(new Error('Product not found'), { status: 404, productId: item.productId });
                }
                if (p.stock < item.quantity) {
                    throw Object.assign(new Error('Insufficient stock'), {
                        status: 400,
                        productId: item.productId,
                        availableStock: p.stock,
                        requestedQuantity: item.quantity,
                    });
                }
            }

            // Decrement stock atomically (protects against race conditions)
            for (const item of items) {
                const updated = await tx.product.updateMany({
                    where: { id: item.productId, stock: { gte: item.quantity } },
                    data: { stock: { decrement: item.quantity } },
                });
                if (updated.count !== 1) {
                    throw Object.assign(new Error('Insufficient stock'), { status: 400, productId: item.productId });
                }
            }

            // Compute total + snapshot items
            let total = new Prisma.Decimal(0);
            const snapshotItems = items.map((i) => {
                const p = byId.get(i.productId)!;
                total = total.plus((p.price as any).mul(i.quantity));
                return {
                    productId: p.id,
                    name: p.name,
                    price: Number(p.price),
                    quantity: i.quantity,
                };
            });

            const created = await tx.order.create({
                data: {
                    patientName,
                    phone,
                    email,
                    items: snapshotItems,
                    totalAmount: total,
                    shippingAddress,
                    paymentMethod,
                    paymentStatus: 'PENDING',
                    status: 'PENDING',
                },
            });

            return created;
        });

        return sendCreated(res, order, 'Order created successfully');
    } catch (error: any) {
        console.error('Error creating order:', error);
        const status = typeof error?.status === 'number' ? error.status : 500;
        if (status === 400 || status === 404) {
            return sendError(res, status, error.message || 'Request failed', {
                productId: error.productId,
                availableStock: error.availableStock,
                requestedQuantity: error.requestedQuantity,
            });
        }
        return sendError(res, 500, 'Failed to create order');
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const id = String(req.params.id);
        const order = await prisma.order.findUnique({ where: { id } });

        if (!order) {
            return sendError(res, 404, 'Order not found');
        }

        return sendSuccess(res, order, 'Order fetched successfully');
    } catch (error) {
        console.error('Error fetching order:', error);
        return sendError(res, 500, 'Failed to fetch order');
    }
};
