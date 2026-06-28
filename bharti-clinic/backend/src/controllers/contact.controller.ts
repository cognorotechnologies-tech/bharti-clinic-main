import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendCreated, sendError } from '../lib/http';

const createContactSchema = z.object({
    name: z.string().trim().min(1),
    email: z.string().trim().email(),
    phone: z.string().trim().min(10),
    subject: z.string().trim().min(1),
    message: z.string().trim().min(1),
});

export const createContactMessage = async (req: Request, res: Response) => {
    try {
        const parsed = createContactSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid request body', parsed.error.flatten());
        }
        const { name, email, phone, subject, message } = parsed.data;

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                subject,
                message,
            },
        });

        return sendCreated(res, contactMessage, 'Inquiry submitted successfully');
    } catch (error) {
        console.error('Error creating contact message:', error);
        return sendError(res, 500, 'Internal server error');
    }
};
