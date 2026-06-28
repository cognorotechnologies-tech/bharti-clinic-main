import request from 'supertest';
import { app } from '../index';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

describe('Orders API Tests', () => {
    let adminToken: string;
    let testCategoryId: string;
    let testProductId: string;
    let outOfStockProductId: string;
    let testOrderId: string;

    beforeAll(async () => {
        // Create test admin
        const hashedPassword = await bcrypt.hash('testpassword123', 10);
        const admin = await prisma.user.create({
            data: {
                email: 'test.orders.admin@bhartiveda.com',
                passwordHash: hashedPassword,
                name: 'Test Orders Admin',
                role: 'ADMIN',
            },
        });

        // Login
        const loginResponse = await request(app)
            .post('/api/admin/login')
            .send({
                email: 'test.orders.admin@bhartiveda.com',
                password: 'testpassword123',
            });
        adminToken = loginResponse.body.data.token;

        // Create test category
        const category = await prisma.category.create({
            data: {
                name: 'Test Order Category',
                slug: 'test-order-category-' + Date.now(),
                type: 'PRODUCT',
            },
        });
        testCategoryId = category.id;

        // Create product with stock
        const product = await prisma.product.create({
            data: {
                name: 'In Stock Product',
                slug: 'in-stock-product-' + Date.now(),
                description: 'Has stock',
                price: 1000,
                stock: 50,
                categoryId: testCategoryId,
                isActive: true,
                isFeatured: false,
            },
        });
        testProductId = product.id;

        // Create out-of-stock product
        const outOfStockProduct = await prisma.product.create({
            data: {
                name: 'Out of Stock Product',
                slug: 'out-of-stock-product-' + Date.now(),
                description: 'No stock',
                price: 1500,
                stock: 0,
                categoryId: testCategoryId,
                isActive: true,
                isFeatured: false,
            },
        });
        outOfStockProductId = outOfStockProduct.id;
    });

    afterAll(async () => {
        // Cleanup
        if (testOrderId) {
            await prisma.order.delete({ where: { id: testOrderId } }).catch(() => { });
        }
        await prisma.product.deleteMany({ where: { categoryId: testCategoryId } });
        await prisma.category.delete({ where: { id: testCategoryId } }).catch(() => { });
        await prisma.user.delete({ where: { email: 'test.orders.admin@bhartiveda.com' } }).catch(() => { });
        await prisma.$disconnect();
    });

    describe('POST /api/orders (Create Order)', () => {
        it('should create order with valid stock', async () => {
            const response = await request(app)
                .post('/api/orders')
                .send({
                    patientName: 'Test Patient',
                    email: 'test.patient@example.com',
                    phone: '9876543210',
                    shippingAddress: {
                        line1: '123 Test Street',
                        city: 'Test City',
                        state: 'Test State',
                        pinCode: '400001',
                    },
                    items: [
                        {
                            productId: testProductId,
                            quantity: 2,
                        },
                    ],
                    paymentMethod: 'COD',
                })
                .expect(201);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.status).toBe('PENDING');

            testOrderId = response.body.data.id;

            // Verify stock was reduced
            const product = await prisma.product.findUnique({
                where: { id: testProductId },
            });
            expect(product?.stock).toBe(48); // 50 - 2
        });

        it('should fail to create order with out-of-stock product', async () => {
            const response = await request(app)
                .post('/api/orders')
                .send({
                    patientName: 'Test Patient',
                    email: 'test.patient@example.com',
                    phone: '9876543210',
                    shippingAddress: {
                        line1: '123 Test Street',
                        city: 'Test City',
                        state: 'Test State',
                        pinCode: '400001',
                    },
                    items: [
                        {
                            productId: outOfStockProductId,
                            quantity: 1,
                        },
                    ],
                    paymentMethod: 'COD',
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('stock');
        });

        it('should fail with insufficient stock', async () => {
            const response = await request(app)
                .post('/api/orders')
                .send({
                    patientName: 'Test Patient',
                    email: 'test.patient@example.com',
                    phone: '9876543210',
                    shippingAddress: {
                        line1: '123 Test Street',
                        city: 'Test City',
                        state: 'Test State',
                        pinCode: '400001',
                    },
                    items: [
                        {
                            productId: testProductId,
                            quantity: 1000, // More than available
                        },
                    ],
                    paymentMethod: 'COD',
                })
                .expect(400);

            expect(response.body.success).toBe(false);
            expect(response.body.message).toContain('stock');
        });

        it('should fail with missing required fields', async () => {
            const response = await request(app)
                .post('/api/orders')
                .send({
                    patientName: 'Test Patient',
                    // Missing email, phone, address, items
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('PATCH /api/admin/orders/:id/status (Update Status)', () => {
        it('should update order status', async () => {
            const response = await request(app)
                .patch(`/api/admin/orders/${testOrderId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    status: 'CONFIRMED',
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.status).toBe('CONFIRMED');
        });

        it('should fail without authentication', async () => {
            const response = await request(app)
                .patch(`/api/admin/orders/${testOrderId}/status`)
                .send({
                    status: 'SHIPPED',
                })
                .expect(401);

            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /api/admin/orders', () => {
        it('should list all orders', async () => {
            const response = await request(app)
                .get('/api/admin/orders')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('orders');
            expect(Array.isArray(response.body.data.orders)).toBe(true);
        });

        it('should filter orders by status', async () => {
            const response = await request(app)
                .get('/api/admin/orders')
                .set('Authorization', `Bearer ${adminToken}`)
                .query({ status: 'CONFIRMED' })
                .expect(200);

            expect(response.body.success).toBe(true);
            const orders = response.body.data.orders;
            orders.forEach((order: any) => {
                expect(order.status).toBe('CONFIRMED');
            });
        });
    });
});
