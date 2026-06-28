import request from 'supertest';
import { app } from '../index';
import prisma from '../lib/prisma';

describe('Appointments API Tests', () => {
    let testCategoryId: string;
    let testTherapyId: string;
    let testAppointmentId: string;

    beforeAll(async () => {
        // Create test category
        const category = await prisma.category.create({
            data: {
                name: 'Test Therapy Category',
                slug: 'test-therapy-category-' + Date.now(),
                type: 'THERAPY',
            },
        });
        testCategoryId = category.id;

        // Create test therapy
        const therapy = await prisma.therapy.create({
            data: {
                name: 'Test Therapy',
                slug: 'test-therapy-' + Date.now(),
                description: 'Test therapy description',
                durationMinutes: 60,
                basePrice: 2000,
                categoryId: testCategoryId,
                isActive: true,
                isFeatured: false,
            },
        });
        testTherapyId = therapy.id;
    });

    afterAll(async () => {
        // Cleanup
        if (testAppointmentId) {
            await prisma.appointment.delete({ where: { id: testAppointmentId } }).catch(() => { });
        }
        await prisma.therapy.delete({ where: { id: testTherapyId } }).catch(() => { });
        await prisma.category.delete({ where: { id: testCategoryId } }).catch(() => { });
        await prisma.$disconnect();
    });

    describe('POST /api/appointments (Create)', () => {
        it('should create appointment with valid therapy', async () => {
            const response = await request(app)
                .post('/api/appointments')
                .send({
                    patientName: 'Test Patient',
                    email: 'test.patient@example.com',
                    phone: '9876543210',
                    therapyId: testTherapyId,
                    preferredDate: '2026-12-31',
                    preferredTime: '10:00 AM',
                    notes: 'Test appointment notes',
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.therapyId).toBe(testTherapyId);
            expect(response.body.data.status).toBe('PENDING');

            testAppointmentId = response.body.data.id;
        });

        it('should fail without required patient name', async () => {
            const response = await request(app)
                .post('/api/appointments')
                .send({
                    email: 'test@example.com',
                    phone: '9876543210',
                    therapyId: testTherapyId,
                    preferredDate: '2026-12-31',
                    preferredTime: '10:00 AM',
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail without therapy ID', async () => {
            const response = await request(app)
                .post('/api/appointments')
                .send({
                    patientName: 'Test Patient',
                    email: 'test@example.com',
                    phone: '9876543210',
                    preferredDate: '2026-12-31',
                    preferredTime: '10:00 AM',
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });

        it('should fail with invalid therapy ID format', async () => {
            const response = await request(app)
                .post('/api/appointments')
                .send({
                    patientName: 'Test Patient',
                    email: 'test@example.com',
                    phone: '9876543210',
                    therapyId: 'not-a-valid-uuid',
                    preferredDate: '2026-12-31',
                    preferredTime: '10:00 AM',
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });
});
