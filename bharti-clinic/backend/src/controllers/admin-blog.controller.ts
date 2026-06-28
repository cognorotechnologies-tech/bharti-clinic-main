import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    slug: z.string().min(1, 'Slug is required'),
    content: z.string().min(1, 'Content is required'),
    excerpt: z.string().min(1, 'Excerpt is required'),
    imageUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
    publishedAt: z.string().optional(),
});

const updatePostSchema = createPostSchema.partial();

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            prisma.blogPost.findMany({
                orderBy: [{ createdAt: 'desc' }],
                skip,
                take: limit,
                include: {
                    author: { select: { id: true, name: true } },
                },
            }),
            prisma.blogPost.count(),
        ]);

        return sendSuccess(
            res,
            { posts, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } },
            'Blog posts fetched successfully'
        );
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return sendError(res, 500, 'Failed to fetch blog posts');
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const post = await prisma.blogPost.findUnique({
            where: { id },
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

export const createPost = async (req: Request, res: Response) => {
    try {
        console.log('📝 Creating blog post...');
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        console.log('Admin from token:', (req as any).admin);
        
        const parsed = createPostSchema.safeParse(req.body);
        if (!parsed.success) {
            console.error('❌ Validation failed:', parsed.error);
            return sendError(res, 400, 'Invalid input', parsed.error.flatten());
        }

        const { title, slug, content, excerpt, imageUrl, tags, status, publishedAt } = parsed.data;

        // Check if slug already exists
        const existing = await prisma.blogPost.findUnique({ where: { slug } });
        if (existing) {
            console.error('❌ Slug already exists:', slug);
            return sendError(res, 400, 'A post with this slug already exists');
        }

        // Get author ID from authenticated user
        const authorId = (req as any).admin.id;
        console.log('Author ID:', authorId);

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                imageUrl,
                tags,
                status,
                publishedAt: status === 'PUBLISHED' && publishedAt ? new Date(publishedAt) : status === 'PUBLISHED' ? new Date() : null,
                authorId,
            },
            include: {
                author: { select: { id: true, name: true } },
            },
        });

        console.log('✅ Blog post created:', post.id);
        return sendSuccess(res, post, 'Blog post created successfully');
    } catch (error) {
        console.error('❌ Error creating blog post:', error);
        console.error('Error stack:', (error as Error).stack);
        return sendError(res, 500, 'Failed to create blog post');
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const parsed = updatePostSchema.safeParse(req.body);
        
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid input', parsed.error.flatten());
        }

        const { title, slug, content, excerpt, imageUrl, tags, status, publishedAt } = parsed.data;

        // Check if post exists
        const existing = await prisma.blogPost.findUnique({ where: { id } });
        if (!existing) {
            return sendError(res, 404, 'Blog post not found');
        }

        // If slug is being changed, check if new slug is available
        if (slug && slug !== existing.slug) {
            const slugExists = await prisma.blogPost.findUnique({ where: { slug } });
            if (slugExists) {
                return sendError(res, 400, 'A post with this slug already exists');
            }
        }

        // Update data
        const updateData: any = {};
        if (title !== undefined) updateData.title = title;
        if (slug !== undefined) updateData.slug = slug;
        if (content !== undefined) updateData.content = content;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
        if (tags !== undefined) updateData.tags = tags;
        if (status !== undefined) {
            updateData.status = status;
            // Set publishedAt when publishing
            if (status === 'PUBLISHED' && !existing.publishedAt) {
                updateData.publishedAt = publishedAt ? new Date(publishedAt) : new Date();
            }
        }

        const post = await prisma.blogPost.update({
            where: { id },
            data: updateData,
            include: {
                author: { select: { id: true, name: true } },
            },
        });

        return sendSuccess(res, post, 'Blog post updated successfully');
    } catch (error) {
        console.error('Error updating blog post:', error);
        return sendError(res, 500, 'Failed to update blog post');
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const existing = await prisma.blogPost.findUnique({ where: { id } });
        if (!existing) {
            return sendError(res, 404, 'Blog post not found');
        }

        await prisma.blogPost.delete({ where: { id } });

        return sendSuccess(res, null, 'Blog post deleted successfully');
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return sendError(res, 500, 'Failed to delete blog post');
    }
};
