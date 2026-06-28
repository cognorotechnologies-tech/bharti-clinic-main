import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

const listBlogQuerySchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(50).default(10),
});

export const getPublishedPosts = async (req: Request, res: Response) => {
    try {
        const parsed = listBlogQuerySchema.safeParse(req.query);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid query parameters', parsed.error.flatten());
        }

        const { page, limit } = parsed.data;
        const skip = (page - 1) * limit;

        const where = { status: 'PUBLISHED' as const };

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                where,
                orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
                skip,
                take: limit,
                include: {
                    author: { select: { id: true, name: true } },
                },
            }),
            prisma.blogPost.count({ where }),
        ]);

        return sendSuccess(
            res,
            posts,
            'Blog posts fetched successfully',
            {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            }
        );
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return sendError(res, 500, 'Failed to fetch blog posts');
    }
};

export const getPublishedPostBySlug = async (req: Request, res: Response) => {
    try {
        const slug = String(req.params.slug);

        const post = await prisma.blogPost.findFirst({
            where: { slug, status: 'PUBLISHED' },
            include: {
                author: { select: { id: true, name: true } },
            },
        });

        if (!post) {
            return sendError(res, 404, 'Blog post not found');
        }

        return sendSuccess(res, post, 'Blog post fetched successfully');
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return sendError(res, 500, 'Failed to fetch blog post');
    }
};

