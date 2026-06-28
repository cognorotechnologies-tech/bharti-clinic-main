import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

const productsQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(12),
    search: z.string().trim().optional(),
    category: z.string().trim().optional(), // comma separated slugs
    minPrice: z.coerce.number().nonnegative().optional(),
    maxPrice: z.coerce.number().nonnegative().optional(),
    minRating: z.coerce.number().min(1).max(5).optional(),
    inStock: z
        .enum(['true', 'false'])
        .optional(),
    sort: z
        .enum(['newest', 'popular', 'price_asc', 'price_desc'])
        .default('newest'),
    featured: z
        .enum(['true', 'false'])
        .optional(),
});

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const parsed = productsQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid query parameters', parsed.error.flatten());
        }

        const {
            page,
            limit,
            search,
            category,
            minPrice,
            maxPrice,
            minRating,
            inStock,
            sort,
            featured,
        } = parsed.data;

        const skip = (page - 1) * limit;

        const where: any = { isActive: true };

        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (category) {
            const categories = category.split(',').map((c) => c.trim());
            where.category = { slug: { in: categories } };
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) where.price.gte = minPrice;
            if (maxPrice !== undefined) where.price.lte = maxPrice;
        }

        if (inStock === 'true') {
            where.stock = { gt: 0 };
        }

        if (featured === 'true') {
            where.isFeatured = true;
        }

        let orderBy: any = { createdAt: 'desc' };
        switch (sort) {
            case 'price_asc':
                orderBy = { price: 'asc' };
                break;
            case 'price_desc':
                orderBy = { price: 'desc' };
                break;
            case 'popular':
                orderBy = { isFeatured: 'desc' };
                break;
            case 'newest':
            default:
                orderBy = { createdAt: 'desc' };
                break;
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                include: {
                    category: true,
                    reviews: {
                        where: { status: 'APPROVED' },
                        select: { rating: true },
                    },
                },
                orderBy,
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ]);

        let filtered = products.map((p) => {
            const avgRating =
                p.reviews.length > 0
                    ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
                    : 0;
            return { ...p, avgRating, reviewCount: p.reviews.length };
        });

        if (minRating !== undefined) {
            filtered = filtered.filter((p) => p.avgRating >= minRating);
        }

        return sendSuccess(
            res,
            filtered,
            'Products fetched successfully',
            {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        );
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        return sendError(res, 500, 'Failed to fetch products');
    }
};

export const getProductBySlug = async (req: Request, res: Response) => {
    try {
        const slug = String(req.params.slug);

        const product = (await prisma.product.findUnique({
            where: { slug },
            include: {
                category: true,
                reviews: {
                    where: { status: 'APPROVED' },
                    orderBy: { createdAt: 'desc' },
                },
            },
        })) as any;

        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        const avgRating =
            product.reviews.length > 0
                ? product.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
                  product.reviews.length
                : 0;

        const related = await prisma.product.findMany({
            where: {
                categoryId: product.categoryId,
                id: { not: product.id },
                isActive: true,
            },
            include: {
                category: true,
                reviews: {
                    where: { status: 'APPROVED' },
                    select: { rating: true },
                },
            },
            take: 4,
        });

        const relatedWithRating = related.map((p) => {
            const avg =
                p.reviews.length > 0
                    ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
                    : 0;
            return { ...p, avgRating: avg, reviewCount: p.reviews.length };
        });

        return sendSuccess(res, {
            ...product,
            avgRating,
            reviewCount: product.reviews.length,
            relatedProducts: relatedWithRating,
        }, 'Product fetched successfully');
    } catch (error) {
        console.error('Error in getProductBySlug:', error);
        return sendError(res, 500, 'Failed to fetch product');
    }
};

export const getProductCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            where: { type: 'PRODUCT' },
            orderBy: { name: 'asc' },
        });
        return sendSuccess(res, categories, 'Product categories fetched successfully');
    } catch (error) {
        console.error('Error in getProductCategories:', error);
        return sendError(res, 500, 'Failed to fetch categories');
    }
};
