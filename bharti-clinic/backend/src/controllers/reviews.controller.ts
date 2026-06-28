import { Request, Response } from 'express';
import { PrismaClient, ReviewStatus } from '@prisma/client';

const prisma = new PrismaClient();

// Get all reviews with filters
export const getReviews = async (req: Request, res: Response) => {
    try {
        const { 
            status, 
            productId, 
            rating, 
            page = '1', 
            limit = '10' 
        } = req.query;

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const where: any = {};

        if (status) {
            where.status = status as ReviewStatus;
        }

        if (productId) {
            where.productId = productId as string;
        }

        if (rating) {
            where.rating = parseInt(rating as string);
        }

        const [reviews, total] = await Promise.all([
            prisma.review.findMany({
                where,
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            slug: true,
                            imageUrls: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                skip,
                take: limitNum,
            }),
            prisma.review.count({ where }),
        ]);

        res.json({
            success: true,
            data: reviews,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum),
            },
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch reviews',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Get single review by ID
export const getReviewById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const review = await prisma.review.findUnique({
            where: { id: id as string },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        imageUrls: true,
                    },
                },
            },
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }

        res.json({
            success: true,
            data: review,
        });
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch review',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Create new review (public endpoint)
export const createReview = async (req: Request, res: Response) => {
    try {
        const { productId, patientName, rating, comment } = req.body;

        // Validation
        if (!productId || !patientName || !rating) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: productId, patientName, rating',
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5',
            });
        }

        // Check if product exists
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found',
            });
        }

        // Create review with PENDING status
        const review = await prisma.review.create({
            data: {
                productId,
                patientName,
                rating,
                comment: comment || '',
                status: 'PENDING',
            },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully. It will be published after approval.',
            data: review,
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create review',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Update review status (admin only)
export const updateReviewStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be PENDING, APPROVED, or REJECTED',
            });
        }

        const review = await prisma.review.update({
            where: { id: id as string },
            data: { status: status as ReviewStatus },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                    },
                },
            },
        });

        res.json({
            success: true,
            message: `Review ${status.toLowerCase()} successfully`,
            data: review,
        });
    } catch (error) {
        console.error('Error updating review status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update review status',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Delete review (admin only)
export const deleteReview = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.review.delete({
            where: { id: id as string },
        });

        res.json({
            success: true,
            message: 'Review deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete review',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

// Get reviews statistics (admin only)
export const getReviewsStats = async (req: Request, res: Response) => {
    try {
        const [total, pending, approved, rejected, avgRating] = await Promise.all([
            prisma.review.count(),
            prisma.review.count({ where: { status: 'PENDING' } }),
            prisma.review.count({ where: { status: 'APPROVED' } }),
            prisma.review.count({ where: { status: 'REJECTED' } }),
            prisma.review.aggregate({
                _avg: {
                    rating: true,
                },
            }),
        ]);

        res.json({
            success: true,
            data: {
                total,
                pending,
                approved,
                rejected,
                averageRating: avgRating._avg.rating || 0,
            },
        });
    } catch (error) {
        console.error('Error fetching review stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch review statistics',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};
