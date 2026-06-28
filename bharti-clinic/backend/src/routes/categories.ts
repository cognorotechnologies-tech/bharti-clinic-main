import { Router } from 'express';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { sendSuccess, sendError } from '../lib/http';
import { z } from 'zod';

const router = Router();

// GET /api/categories?type=PRODUCT|THERAPY
router.get('/', async (req: Request, res: Response) => {
    try {
        const schema = z.object({
            type: z.enum(['PRODUCT', 'THERAPY']).optional(),
        });

        const parsed = schema.safeParse(req.query);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid query parameters');
        }

        const { type } = parsed.data;

        const categories = await prisma.category.findMany({
            where: type ? { type } : undefined,
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                slug: true,
                type: true,
                imageUrl: true,
            },
        });

        return sendSuccess(res, categories);
    } catch (error) {
        console.error('Get categories error:', error);
        return sendError(res, 500, 'Failed to fetch categories');
    }
});

// GET /api/categories/:slug
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;

        const category = await prisma.category.findUnique({
            where: { slug },
        });

        if (!category) {
            return sendError(res, 404, 'Category not found');
        }

        // Get counts
        const productCount = await prisma.product.count({
            where: { categoryId: category.id },
        });

        const therapyCount = await prisma.therapy.count({
            where: { categoryId: category.id },
        });

        return sendSuccess(res, {
            ...category,
            productCount,
            therapyCount,
        });
    } catch (error) {
        console.error('Get category error:', error);
        return sendError(res, 500, 'Failed to fetch category');
    }
});

export default router;
