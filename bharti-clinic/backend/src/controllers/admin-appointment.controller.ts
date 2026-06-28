import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { sendError, sendSuccess } from '../lib/http';

// Get all appointments
export async function getAdminAppointments(req: Request, res: Response) {
    try {
        const page = Math.max(1, parseInt(req.query.page as string) || 1);
        const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
        const search = (req.query.search as string)?.trim();
        const status = (req.query.status as string)?.trim();

        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { patientName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (status) {
            where.status = status;
        }

        const [appointments, total] = await Promise.all([
            prisma.appointment.findMany({
                where,
                skip,
                take: limit,
                include: { therapy: true },
                orderBy: { preferredDate: 'asc' },
            }),
            prisma.appointment.count({ where }),
        ]);

        return sendSuccess(res, {
            appointments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Get admin appointments error:', error);
        return sendError(res, 500, 'Failed to fetch appointments');
    }
}

// Get single appointment
export async function getAdminAppointment(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const appointment = await prisma.appointment.findUnique({
            where: { id },
            include: { therapy: true },
        });

        if (!appointment) {
            return sendError(res, 404, 'Appointment not found');
        }

        return sendSuccess(res, appointment);
    } catch (error) {
        console.error('Get admin appointment error:', error);
        return sendError(res, 500, 'Failed to fetch appointment');
    }
}

// Update appointment status
export async function updateAdminAppointmentStatus(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { status } = req.body;

        if (!['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'].includes(status)) {
            return sendError(res, 400, 'Invalid appointment status');
        }

        const appointment = await prisma.appointment.findUnique({ where: { id } });
        if (!appointment) {
            return sendError(res, 404, 'Appointment not found');
        }

        const updated = await prisma.appointment.update({
            where: { id },
            data: { status },
            include: { therapy: true },
        });

        return sendSuccess(res, updated);
    } catch (error) {
        console.error('Update appointment status error:', error);
        return sendError(res, 500, 'Failed to update appointment');
    }
}

// Delete appointment
export async function deleteAdminAppointment(req: Request, res: Response) {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

        const appointment = await prisma.appointment.findUnique({ where: { id } });
        if (!appointment) {
            return sendError(res, 404, 'Appointment not found');
        }

        await prisma.appointment.delete({ where: { id } });

        return sendSuccess(res, { message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Delete appointment error:', error);
        return sendError(res, 500, 'Failed to delete appointment');
    }
}
