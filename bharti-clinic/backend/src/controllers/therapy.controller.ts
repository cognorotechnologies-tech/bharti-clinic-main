import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

const listTherapiesQuerySchema = z.object({
    category: z.string().trim().optional(),
    featured: z.enum(['true', 'false']).optional(),
});

export const getAllTherapies = async (req: Request, res: Response) => {
    try {
        const parsed = listTherapiesQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid query parameters', parsed.error.flatten());
        }

        const { featured, category } = parsed.data;

        const therapies = await prisma.therapy.findMany({
            where: {
                isActive: true,
                ...(featured === 'true' ? { isFeatured: true } : {}),
                ...(category ? { category: { slug: category } } : {}),
            },
            include: { category: true },
            orderBy: { createdAt: 'desc' },
        });

        return sendSuccess(res, therapies, 'Therapies fetched successfully');
    } catch (error) {
        console.error('Error in getAllTherapies:', error);
        return sendError(res, 500, 'Failed to fetch therapies');
    }
};

export const getTherapyBySlug = async (req: Request, res: Response) => {
    try {
        const slug = String(req.params.slug);

        const therapy = await prisma.therapy.findUnique({
            where: { slug },
            include: { category: true },
        });

        if (!therapy) {
            return sendError(res, 404, 'Therapy not found');
        }

        const related = await prisma.therapy.findMany({
            where: {
                categoryId: therapy.categoryId,
                NOT: { id: therapy.id },
                isActive: true,
            },
            take: 3,
            include: { category: true },
        });

        return sendSuccess(res, { therapy, related }, 'Therapy fetched successfully');
    } catch (error) {
        console.error('Error in getTherapyBySlug:', error);
        return sendError(res, 500, 'Failed to fetch therapy detail');
    }
};
