import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

const galleryQuerySchema = z.object({
    type: z.enum(['PHOTO', 'VIDEO']).optional(),
    category: z.string().trim().optional(),
    limit: z.coerce.number().int().min(1).max(100).optional(),
});

export const getGalleryItems = async (req: Request, res: Response) => {
    try {
        const parsed = galleryQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid query parameters', parsed.error.flatten());
        }

        const { type, category, limit } = parsed.data;

        const items = await prisma.galleryItem.findMany({
            where: {
                isActive: true,
                ...(type ? { type } : {}),
                ...(category ? { category } : {}),
            },
            orderBy: { sortOrder: 'asc' },
            ...(limit ? { take: limit } : {}),
        });

        return sendSuccess(res, items, 'Gallery items fetched successfully');
    } catch (error) {
        console.error('Error fetching gallery items:', error);
        return sendError(res, 500, 'Failed to fetch gallery items');
    }
};
