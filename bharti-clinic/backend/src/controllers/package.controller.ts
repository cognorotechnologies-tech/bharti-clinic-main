import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

export const getAllPackages = async (_req: Request, res: Response) => {
    try {
        const packages = await prisma.package.findMany({
            where: { isActive: true },
            include: {
                therapies: {
                    include: { therapy: { include: { category: true } } },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const formatted = packages.map((pkg) => ({
            ...pkg,
            therapies: pkg.therapies.map((pt) => pt.therapy),
        }));

        return sendSuccess(res, formatted, 'Packages fetched successfully');
    } catch (error) {
        console.error('Error in getAllPackages:', error);
        return sendError(res, 500, 'Failed to fetch packages');
    }
};

export const getPackageBySlug = async (req: Request, res: Response) => {
    try {
        const slug = String(req.params.slug);

        const pkg = (await prisma.package.findUnique({
            where: { slug },
            include: {
                therapies: {
                    include: { therapy: { include: { category: true } } },
                },
            },
        })) as any;

        if (!pkg) {
            return sendError(res, 404, 'Package not found');
        }

        const formatted = {
            ...pkg,
            therapies: pkg.therapies.map((pt: any) => pt.therapy),
        };

        return sendSuccess(res, formatted, 'Package fetched successfully');
    } catch (error) {
        console.error('Error in getPackageBySlug:', error);
        return sendError(res, 500, 'Failed to fetch package detail');
    }
};
