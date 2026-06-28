import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';
import { Decimal } from '@prisma/client/runtime/library';

const productCreateSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    sku: z.string().optional(),
    ingredients: z.string().optional(),
    howToUse: z.string().optional(),
    price: z.coerce.number().positive(),
    comparePrice: z.coerce.number().positive().optional(),
    stock: z.coerce.number().int().nonnegative(),
    categoryId: z.string().uuid(),
    imageUrls: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
});

const productUpdateSchema = productCreateSchema.partial();

// Get all products (admin view with pagination)
export async function getAdminProducts(req: Request, res: Response) {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
        const search = (req.query.search as string)?.trim();

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { sku: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                skip,
                take: limit,
                include: { category: true },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.product.count({ where }),
        ]);

        return sendSuccess(res, {
            products: products.map((p) => ({
                ...p,
                price: parseFloat(p.price.toString()),
                comparePrice: p.comparePrice ? parseFloat(p.comparePrice.toString()) : null,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get admin products error:', error);
        return sendError(res, 500, 'Failed to fetch products');
    }
}

// Get single product
export async function getAdminProduct(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });

        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        return sendSuccess(res, {
            ...product,
            price: parseFloat(product.price.toString()),
            comparePrice: product.comparePrice ? parseFloat(product.comparePrice.toString()) : null,
        });
    } catch (error) {
        console.error('Get admin product error:', error);
        return sendError(res, 500, 'Failed to fetch product');
    }
}

// Create product
export async function createAdminProduct(req: Request, res: Response) {
    try {
        const parsed = productCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid product data', parsed.error.flatten());
        }

        const data = parsed.data;

        // Check if slug already exists
        const existing = await prisma.product.findUnique({
            where: { slug: data.slug },
        });
        if (existing) {
            return sendError(res, 400, 'Product slug already exists');
        }

        const product = await prisma.product.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                sku: data.sku,
                ingredients: data.ingredients,
                howToUse: data.howToUse,
                price: new Decimal(data.price),
                comparePrice: data.comparePrice ? new Decimal(data.comparePrice) : null,
                stock: data.stock,
                categoryId: data.categoryId,
                imageUrls: data.imageUrls || [],
                isActive: data.isActive ?? true,
                isFeatured: data.isFeatured ?? false,
            },
            include: { category: true },
        });

        return sendSuccess(
            res,
            {
                ...product,
                price: parseFloat(product.price.toString()),
                comparePrice: product.comparePrice ? parseFloat(product.comparePrice.toString()) : null,
            },
            'Product created successfully'
        );
    } catch (error) {
        console.error('Create product error:', error);
        return sendError(res, 500, 'Failed to create product');
    }
}

// Update product
export async function updateAdminProduct(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const parsed = productUpdateSchema.safeParse(req.body);

        if (!parsed.success) {
            return sendError(res, 400, 'Invalid product data', parsed.error.flatten());
        }

        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        // Check slug uniqueness if being updated
        if (parsed.data.slug && parsed.data.slug !== product.slug) {
            const existing = await prisma.product.findUnique({
                where: { slug: parsed.data.slug },
            });
            if (existing) {
                return sendError(res, 400, 'Product slug already exists');
            }
        }

        const updateData: any = { ...parsed.data };
        if (parsed.data.price) {
            updateData.price = new Decimal(parsed.data.price);
        }
        if (parsed.data.comparePrice) {
            updateData.comparePrice = new Decimal(parsed.data.comparePrice);
        }

        const updated = await prisma.product.update({
            where: { id },
            data: updateData,
            include: { category: true },
        });

        return sendSuccess(res, {
            ...updated,
            price: parseFloat(updated.price.toString()),
            comparePrice: updated.comparePrice ? parseFloat(updated.comparePrice.toString()) : null,
        });
    } catch (error) {
        console.error('Update product error:', error);
        return sendError(res, 500, 'Failed to update product');
    }
}

// Delete product
export async function deleteAdminProduct(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) {
            return sendError(res, 404, 'Product not found');
        }

        await prisma.product.delete({ where: { id } });

        return sendSuccess(res, { message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        return sendError(res, 500, 'Failed to delete product');
    }
}
