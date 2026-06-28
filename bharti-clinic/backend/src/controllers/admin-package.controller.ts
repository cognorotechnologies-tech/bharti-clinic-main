import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';
import { Decimal } from '@prisma/client/runtime/library';

const packageCreateSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().min(1),
    totalPrice: z.coerce.number().positive(),
    originalPrice: z.coerce.number().positive(),
    validFrom: z.string().datetime().optional(),
    validTo: z.string().datetime().optional(),
    couponCode: z.string().optional(),
    isActive: z.boolean().optional(),
    therapyIds: z.array(z.string().uuid()).optional(),
});

const packageUpdateSchema = packageCreateSchema.partial();

// Get all packages
export async function getAdminPackages(req: Request, res: Response) {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
        const search = (req.query.search as string)?.trim();

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { slug: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [packages, total] = await Promise.all([
            prisma.package.findMany({
                where,
                skip,
                take: limit,
                include: { therapies: { include: { therapy: true } } },
                orderBy: { createdAt: 'desc' },
            }),
            prisma.package.count({ where }),
        ]);

        return sendSuccess(res, {
            packages: packages.map((p) => ({
                ...p,
                totalPrice: parseFloat(p.totalPrice.toString()),
                originalPrice: parseFloat(p.originalPrice.toString()),
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get admin packages error:', error);
        return sendError(res, 500, 'Failed to fetch packages');
    }
}

// Get single package
export async function getAdminPackage(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const pkg = await prisma.package.findUnique({
            where: { id },
            include: { therapies: { include: { therapy: true } } },
        });

        if (!pkg) {
            return sendError(res, 404, 'Package not found');
        }

        return sendSuccess(res, {
            ...pkg,
            totalPrice: parseFloat(pkg.totalPrice.toString()),
            originalPrice: parseFloat(pkg.originalPrice.toString()),
        });
    } catch (error) {
        console.error('Get admin package error:', error);
        return sendError(res, 500, 'Failed to fetch package');
    }
}

// Create package
export async function createAdminPackage(req: Request, res: Response) {
    try {
        const parsed = packageCreateSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid package data', parsed.error.flatten());
        }

        const data = parsed.data;

        // Check if slug already exists
        const existing = await prisma.package.findUnique({
            where: { slug: data.slug },
        });
        if (existing) {
            return sendError(res, 400, 'Package slug already exists');
        }

        const pkg = await prisma.package.create({
            data: {
                name: data.name,
                slug: data.slug,
                description: data.description,
                totalPrice: new Decimal(data.totalPrice),
                originalPrice: new Decimal(data.originalPrice),
                validFrom: data.validFrom ? new Date(data.validFrom) : null,
                validTo: data.validTo ? new Date(data.validTo) : null,
                couponCode: data.couponCode,
                isActive: data.isActive ?? true,
                therapies: {
                    create: (data.therapyIds || []).map((therapyId) => ({
                        therapyId,
                    })),
                },
            },
            include: { therapies: { include: { therapy: true } } },
        });

        return sendSuccess(
            res,
            {
                ...pkg,
                totalPrice: parseFloat(pkg.totalPrice.toString()),
                originalPrice: parseFloat(pkg.originalPrice.toString()),
            },
            'Package created successfully'
        );
    } catch (error) {
        console.error('Create package error:', error);
        return sendError(res, 500, 'Failed to create package');
    }
}

// Update package
export async function updateAdminPackage(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const parsed = packageUpdateSchema.safeParse(req.body);

        if (!parsed.success) {
            return sendError(res, 400, 'Invalid package data', parsed.error.flatten());
        }

        const pkg = await prisma.package.findUnique({ where: { id } });
        if (!pkg) {
            return sendError(res, 404, 'Package not found');
        }

        // Check slug uniqueness if being updated
        if (parsed.data.slug && parsed.data.slug !== pkg.slug) {
            const existing = await prisma.package.findUnique({
                where: { slug: parsed.data.slug },
            });
            if (existing) {
                return sendError(res, 400, 'Package slug already exists');
            }
        }

        const updateData: any = { ...parsed.data };
        if (parsed.data.totalPrice) {
            updateData.totalPrice = new Decimal(parsed.data.totalPrice);
        }
        if (parsed.data.originalPrice) {
            updateData.originalPrice = new Decimal(parsed.data.originalPrice);
        }
        if (parsed.data.validFrom) {
            updateData.validFrom = new Date(parsed.data.validFrom);
        }
        if (parsed.data.validTo) {
            updateData.validTo = new Date(parsed.data.validTo);
        }

        // Handle therapy IDs update
        if (parsed.data.therapyIds) {
            // Delete existing relationships
            await prisma.packageTherapy.deleteMany({
                where: { packageId: id },
            });
            // Create new relationships
            updateData.therapies = {
                create: parsed.data.therapyIds.map((therapyId: string) => ({
                    therapyId,
                })),
            };
            delete updateData.therapyIds;
        }

        const updated = await prisma.package.update({
            where: { id },
            data: updateData,
            include: { therapies: { include: { therapy: true } } },
        });

        return sendSuccess(res, {
            ...updated,
            totalPrice: parseFloat(updated.totalPrice.toString()),
            originalPrice: parseFloat(updated.originalPrice.toString()),
        });
    } catch (error) {
        console.error('Update package error:', error);
        return sendError(res, 500, 'Failed to update package');
    }
}

// Delete package
export async function deleteAdminPackage(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const pkg = await prisma.package.findUnique({ where: { id } });
        if (!pkg) {
            return sendError(res, 400, 'Package slug already exists');
        }

        // Delete related package therapies first
        await prisma.packageTherapy.deleteMany({
            where: { packageId: id },
        });

        await prisma.package.delete({ where: { id } });

        return sendSuccess(res, { message: 'Package deleted successfully' });
    } catch (error) {
        console.error('Delete package error:', error);
        return sendError(res, 500, 'Failed to delete package');
    }
}
