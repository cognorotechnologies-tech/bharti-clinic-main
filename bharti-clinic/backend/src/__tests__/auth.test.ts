import request from 'supertest';
import { app } from '../index';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

describe('Auth API Tests', () => {
    let testAdminId: string;
    const uniqueSuffix = Date.now();
    const testEmail = `test.admin.${uniqueSuffix}@bhartiveda.com`;

    beforeAll(async () => {
        // Create test admin user
        const hashedPassword = await bcrypt.hash('testpassword123', 10);
        const admin = await prisma.user.create({
            data: {
                email: testEmail,
                passwordHash: hashedPassword,
                name: 'Test Admin',
                role: 'ADMIN',
            },
        });
        testAdminId = admin.id;
    });

    afterAll(async () => {
        // Cleanup
        await prisma.user.delete({ where: { id: testAdminId } }).catch(() => { });
        await prisma.$disconnect();
    });

    describe('POST /api/admin/login', () => {
        it('should login successfully with correct credentials', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    email: testEmail,
                    password: 'testpassword123',
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('token');
            expect(response.body.data).toHaveProperty('user');
            expect(response.body.data.user.email).toBe(testEmail);
            expect(response.body.data.user.role).toBe('ADMIN');
        });

        it('should fail with wrong password', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    email: testEmail,
                    password: 'wrongpassword',
                })
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should fail with non-existent email', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    email: 'nonexistent@bhartiveda.com',
                    password: 'testpassword123',
                })
                .expect(401);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid credentials');
        });

        it('should fail with missing email field', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    password: 'testpassword123',
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Email and password are required');
        });

        it('should fail with missing password field', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    email: testEmail,
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Email and password are required');
        });

        it('should fail with empty credentials', async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({})
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('Token Validation', () => {
        let validToken: string;

        beforeAll(async () => {
            const response = await request(app)
                .post('/api/admin/login')
                .send({
                    email: testEmail,
                    password: 'testpassword123',
                });
            validToken = response.body.data.token;
        });

        it('should access protected route with valid token', async () => {
            const response = await request(app)
                .get('/api/admin/dashboard/kpi')
                .set('Authorization', `Bearer ${validToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('revenueToday');
        });

        it('should fail to access protected route without token', async () => {
            const response = await request(app)
                .get('/api/admin/dashboard/kpi')
                .expect(401);

            expect(response.body.success).toBe(false);
        });

        it('should fail with invalid token', async () => {
            const response = await request(app)
                .get('/api/admin/dashboard/kpi')
                .set('Authorization', 'Bearer invalid.token.here')
                .expect(401);

            expect(response.body.success).toBe(false);
        });

        it('should fail with malformed authorization header', async () => {
            const response = await request(app)
                .get('/api/admin/dashboard/kpi')
                .set('Authorization', 'InvalidFormat')
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });
});
