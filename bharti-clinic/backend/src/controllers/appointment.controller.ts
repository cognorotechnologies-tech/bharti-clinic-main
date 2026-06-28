import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendCreated, sendError } from '../lib/http';

const createAppointmentSchema = z.object({
    patientName: z.string().trim().min(1),
    phone: z.string().trim().min(10),
    email: z.string().trim().email(),
    therapyId: z.string().uuid(),
    preferredDate: z.union([z.string(), z.date()]),
    preferredTime: z.string().trim().min(1),
    notes: z.string().trim().optional(),
});

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const parsed = createAppointmentSchema.safeParse(req.body);
        if (!parsed.success) {
            return sendError(res, 400, 'Invalid request body', parsed.error.flatten());
        }

        const { patientName, phone, email, therapyId, preferredDate, preferredTime, notes } = parsed.data;

        const appointment = await prisma.appointment.create({
            data: {
                patientName,
                phone,
                email,
                therapyId,
                preferredDate: new Date(preferredDate),
                preferredTime,
                notes,
                status: 'PENDING',
            },
        });

        return sendCreated(res, appointment, 'Appointment request received');
    } catch (error) {
        console.error('Error in createAppointment:', error);
        return sendError(res, 500, 'Failed to create appointment');
    }
};
