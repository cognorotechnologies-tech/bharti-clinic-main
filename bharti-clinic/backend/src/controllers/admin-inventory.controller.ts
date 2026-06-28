import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { sendSuccess, sendError } from '../lib/http';

// Get all inventory (all products with stock info)
export async function getAllInventory(req: Request, res: Response) {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: {
                name: 'asc',
            },
        });

        const inventory = products.map((product) => ({
            productId: product.id,
            productName: product.name,
            category: product.category.name,
            currentStock: product.stock,
            threshold: 10, // Default threshold
            lastUpdated: product.updatedAt,
        }));

        return sendSuccess(res, inventory);
    } catch (error) {
        console.error('Get inventory error:', error);
        return sendError(res, 500, 'Failed to fetch inventory');
    }
}

// Create inventory log (restock)
export async function createInventoryLog(req: Request, res: Response) {
    try {
        const { productId, quantity, reason } = req.body;
        const adminId = (req as any).admin?.id;

        if (!productId || !quantity || quantity <= 0) {
            return sendError(res, 400, 'Product ID and valid quantity are required');
        }

        // Get current product
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        // Update product stock
        const newStock = product.stock + quantity;
        await prisma.product.update({
            where: { id: productId },
            data: { stock: newStock },
        });

        // Create inventory log entry
        const log = await prisma.inventoryLog.create({
            data: {
                productId,
                changeAmount: quantity,
                newStock,
                reason: reason || 'Restock',
                adminId,
            },
            include: {
                product: {
                    select: {
                        name: true,
                    },
                },
                admin: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return sendSuccess(res, {
            message: 'Inventory updated successfully',
            log: {
                id: log.id,
                productName: log.product.name,
                change: log.changeAmount,
                newStock: log.newStock,
                reason: log.reason,
                adminName: log.admin?.name || log.admin?.email || 'Unknown',
                createdAt: log.createdAt,
            },
        });
    } catch (error) {
        console.error('Create inventory log error:', error);
        return sendError(res, 500, 'Failed to update inventory');
    }
}

// Get inventory logs
export async function getInventoryLogs(req: Request, res: Response) {
    try {
        const { productId, limit = 50 } = req.query;

        const where = productId ? { productId: productId as string } : {};

        const logs = await prisma.inventoryLog.findMany({
            where,
            take: parseInt(limit as string),
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                product: {
                    select: {
                        name: true,
                    },
                },
                admin: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        const formattedLogs = logs.map((log) => ({
            id: log.id,
            productName: log.product.name,
            change: log.changeAmount,
            newStock: log.newStock,
            reason: log.reason,
            adminName: log.admin?.name || log.admin?.email || 'System',
            createdAt: log.createdAt,
        }));

        return sendSuccess(res, formattedLogs);
    } catch (error) {
        console.error('Get inventory logs error:', error);
        return sendError(res, 500, 'Failed to fetch inventory logs');
    }
}
