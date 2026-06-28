import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendCreated, sendError, sendSuccess } from '../lib/http';

const createReviewSchema = z.object({
    patientName: z.string().trim().min(1),
    rating: z.coerce.number().int().min(1).max(5),
    comment: z.string().trim().min(1),
});

export const createReview = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        const parsed = createReviewSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid request body', parsed.error.flatten());
        }
        const { patientName, rating, comment } = parsed.data;

        const product = await prisma.product.findUnique({ where: { slug: String(slug) } });
        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        const review = await prisma.review.create({
            data: {
                productId: product.id,
                patientName,
                rating,
                comment,
                status: 'PENDING',
            },
        });

        return sendCreated(res, review, 'Review submitted for approval');
    } catch (error) {
        console.error('Error in createReview:', error);
        return sendError(res, 500, 'Failed to submit review');
    }
};

export const getProductReviews = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const product = await prisma.product.findUnique({ where: { slug: String(slug) } });
        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        const reviews = await prisma.review.findMany({
            where: {
                productId: product.id,
                status: 'APPROVED',
            },
            orderBy: { createdAt: 'desc' },
        });

        return sendSuccess(res, reviews, 'Reviews fetched successfully');
    } catch (error) {
        console.error('Error in getProductReviews:', error);
        return sendError(res, 500, 'Failed to fetch reviews');
    }
};

// Admin endpoints
export const adminGetPendingReviews = async (_req: Request, res: Response) => {
    try {
        const reviews = await prisma.review.findMany({
            where: { status: 'PENDING' },
            include: {
                product: { select: { name: true, slug: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return sendSuccess(res, reviews, 'Pending reviews fetched successfully');
    } catch (error) {
        console.error('Error in adminGetPendingReviews:', error);
        return sendError(res, 500, 'Failed to fetch pending reviews');
    }
};

export const adminUpdateReviewStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const statusSchema = z.object({ status: z.enum(['APPROVED', 'REJECTED']) });
        const parsed = statusSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid request body', parsed.error.flatten());
        }
        const { status } = parsed.data;

        const review = await prisma.review.update({
            where: { id: String(id) },
            data: { status },
        });

        return sendSuccess(res, review, `Review ${status.toLowerCase()}`);
    } catch (error) {
        console.error('Error in adminUpdateReviewStatus:', error);
        return sendError(res, 500, 'Failed to update review status');
    }
};
