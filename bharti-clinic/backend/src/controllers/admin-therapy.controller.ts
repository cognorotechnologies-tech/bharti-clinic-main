import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';
import { Decimal } from '@prisma/client/runtime/library';

const therapyCreateSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    durationMinutes: z.coerce.number().int().positive(),
    basePrice: z.coerce.number().positive(),
    discountedPrice: z.coerce.number().positive().optional(),
    discountExpiry: z.string().datetime().optional(),
    categoryId: z.string().uuid(),
    imageUrl: z.string().optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
});

const therapyUpdateSchema = therapyCreateSchema.partial();

// Get all therapies (admin view)
export async function getAdminTherapies(req: Request, res: Response) {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
        const search = (req.query.search as string)?.trim();

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [therapies, total] = await Promise.all([
            prisma.therapy.findMany({
                where,
                skip,
                take: limit,
                include: { category: true },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.therapy.count({ where }),
        ]);

        return sendSuccess(res, {
            therapies: therapies.map((t) => ({
                ...t,
                basePrice: parseFloat(t.basePrice.toString()),
                discountedPrice: t.discountedPrice ? parseFloat(t.discountedPrice.toString()) : null,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get admin therapies error:', error);
        return sendError(res, 500, 'Failed to fetch therapies');
    }
}

// Get single therapy
export async function getAdminTherapy(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const therapy = await prisma.therapy.findUnique({
            where: { id },
            include: { category: true },
        });

        if (!therapy) {
            return sendError(res, 404, 'Therapy not found');
        }

        return sendSuccess(res, {
            ...therapy,
            basePrice: parseFloat(therapy.basePrice.toString()),
            discountedPrice: therapy.discountedPrice ? parseFloat(therapy.discountedPrice.toString()) : null,
        });
    } catch (error) {
        console.error('Get admin therapy error:', error);
        return sendError(res, 500, 'Failed to fetch therapy');
    }
}

// Create therapy
export async function createAdminTherapy(req: Request, res: Response) {
    try {
        const parsed = therapyCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid therapy data', parsed.error.flatten());
        }

        const data = parsed.data;

        // Check if slug already exists
        const existing = await prisma.therapy.findUnique({
            where: { slug: data.slug },
        });
        if (existing) {
            return sendError(res, 400, 'Therapy slug already exists');
        }

        const therapy = await prisma.therapy.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                durationMinutes: data.durationMinutes,
                basePrice: new Decimal(data.basePrice),
                discountedPrice: data.discountedPrice ? new Decimal(data.discountedPrice) : null,
                discountExpiry: data.discountExpiry ? new Date(data.discountExpiry) : null,
                categoryId: data.categoryId,
                imageUrl: data.imageUrl,
                isActive: data.isActive ?? true,
                isFeatured: data.isFeatured ?? false,
            },
            include: { category: true },
        });

        return sendSuccess(
            res,
            {
                ...therapy,
                basePrice: parseFloat(therapy.basePrice.toString()),
                discountedPrice: therapy.discountedPrice ? parseFloat(therapy.discountedPrice.toString()) : null,
            },
            'Therapy created successfully'
        );
    } catch (error) {
        console.error('Create therapy error:', error);
        return sendError(res, 500, 'Failed to create therapy');
    }
}

// Update therapy
export async function updateAdminTherapy(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const parsed = therapyUpdateSchema.safeParse(req.body);

        if (!parsed.success) {
            return sendError(res, 400, 'Invalid therapy data', parsed.error.flatten());
        }

        const therapy = await prisma.therapy.findUnique({ where: { id } });
        if (!therapy) {
            return sendError(res, 404, 'Therapy not found');
        }

        // Check slug uniqueness if being updated
        if (parsed.data.slug && parsed.data.slug !== therapy.slug) {
            const existing = await prisma.therapy.findUnique({
                where: { slug: parsed.data.slug },
            });
            if (existing) {
                return sendError(res, 400, 'Therapy slug already exists');
            }
        }

        const updateData: any = { ...parsed.data };
        if (parsed.data.basePrice) {
            updateData.basePrice = new Decimal(parsed.data.basePrice);
        }
        if (parsed.data.discountedPrice) {
            updateData.discountedPrice = new Decimal(parsed.data.discountedPrice);
        }
        if (parsed.data.discountExpiry) {
            updateData.discountExpiry = new Date(parsed.data.discountExpiry);
        }

        const updated = await prisma.therapy.update({
            where: { id },
            data: updateData,
            include: { category: true },
        });

        return sendSuccess(res, {
            ...updated,
            basePrice: parseFloat(updated.basePrice.toString()),
            discountedPrice: updated.discountedPrice ? parseFloat(updated.discountedPrice.toString()) : null,
        });
    } catch (error) {
        console.error('Update therapy error:', error);
        return sendError(res, 500, 'Failed to update therapy');
    }
}

// Delete therapy
export async function deleteAdminTherapy(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const therapy = await prisma.therapy.findUnique({ where: { id } });
        if (!therapy) {
            return sendError(res, 404, 'Therapy not found');
        }

        await prisma.therapy.delete({ where: { id } });

        return sendSuccess(res, { message: 'Therapy deleted successfully' });
    } catch (error) {
        console.error('Delete therapy error:', error);
        return sendError(res, 500, 'Failed to delete therapy');
    }
}
