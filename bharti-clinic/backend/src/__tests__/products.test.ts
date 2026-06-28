import request from 'supertest';
import { app } from '../index';
import prisma from '../lib/prisma';
import bcrypt from 'bcryptjs';

describe('Products API Tests', () => {
    let adminToken: string;
    let testCategoryId: string;
    let testProductId: string;
    const uniqueSuffix = Date.now();

    beforeAll(async () => {
        // Create test admin
        const hashedPassword = await bcrypt.hash('testpassword123', 10);
        const admin = await prisma.user.create({
            data: {
                email: `test.products.admin.${uniqueSuffix}@bhartiveda.com`,
                passwordHash: hashedPassword,
                name: 'Test Products Admin',
                role: 'ADMIN',
            },
        });

        // Login to get token
        const loginResponse = await request(app)
            .post('/api/admin/login')
            .send({
                email: `test.products.admin.${uniqueSuffix}@bhartiveda.com`,
                password: 'testpassword123',
            });
        adminToken = loginResponse.body.data.token;

        // Create test category
        const category = await prisma.category.create({
            data: {
                name: 'Test Category',
                slug: `test-category-${uniqueSuffix}`,
                type: 'PRODUCT',
            },
        });
        testCategoryId = category.id;
    });

    afterAll(async () => {
        // Cleanup
        if (testProductId) {
            await prisma.product.delete({ where: { id: testProductId } }).catch(() => { });
        }
        await prisma.category.delete({ where: { id: testCategoryId } }).catch(() => { });
        await prisma.user.delete({ where: { email: `test.products.admin.${uniqueSuffix}@bhartiveda.com` } }).catch(() => { });
        await prisma.$disconnect();
    });

    describe('GET /api/products', () => {
        it('should list products with pagination', async () => {
            const response = await request(app)
                .get('/api/products')
                .query({ page: 1, limit: 10 })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should filter products by category slug', async () => {
            const response = await request(app)
                .get('/api/products')
                .query({ category: `test-category-${uniqueSuffix}` })
                .expect(200);

            expect(response.body.success).toBe(true);
            const products = response.body.data;
            products.forEach((product: any) => {
                expect(product.category.slug).toBe(`test-category-${uniqueSuffix}`);
            });
        });

        it('should search products by name', async () => {
            const response = await request(app)
                .get('/api/products')
                .query({ search: 'test' })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('GET /api/products/:slug', () => {
        beforeAll(async () => {
            // Create a test product
            const product = await prisma.product.create({
                data: {
                    name: 'Test Product',
                    slug: `test-product-slug-${uniqueSuffix}`,
                    description: 'Test description',
                    price: 999,
                    stock: 50,
                    categoryId: testCategoryId,
                    isActive: true,
                    isFeatured: false,
                },
            });
            testProductId = product.id;
        });

        it('should get product by slug', async () => {
            const response = await request(app)
                .get(`/api/products/test-product-slug-${uniqueSuffix}`)
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.slug).toBe(`test-product-slug-${uniqueSuffix}`);
            expect(response.body.data.name).toBe('Test Product');
        });

        it('should return 404 for non-existent slug', async () => {
            const response = await request(app)
                .get('/api/products/non-existent-slug')
                .expect(404);

            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /api/admin/products (Create)', () => {
        it('should create product with valid data', async () => {
            const response = await request(app)
                .post('/api/admin/products')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'New Test Product',
                    slug: `new-test-product-${uniqueSuffix}`,
                    description: 'New test description',
                    price: 1500,
                    stock: 100,
                    categoryId: testCategoryId,
                    isActive: true,
                    isFeatured: false,
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.name).toBe('New Test Product');
            expect(response.body.data.price).toBe(1500);

            // Cleanup
            await prisma.product.delete({ where: { id: response.body.data.id } });
        });

        it('should fail without authentication', async () => {
            const response = await request(app)
                .post('/api/admin/products')
                .send({
                    name: 'Unauthorized Product',
                    slug: 'unauthorized-product',
                    description: 'Test',
                    price: 1000,
                    stock: 50,
                    categoryId: testCategoryId,
                })
                .expect(401);

            expect(response.body.success).toBe(false);
        });

        it('should fail with missing required fields', async () => {
            const response = await request(app)
                .post('/api/admin/products')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Incomplete Product',
                    // Missing slug, description, price, etc.
                })
                .expect(400);

            expect(response.body.success).toBe(false);
        });
    });

    describe('PUT /api/admin/products/:id (Update)', () => {
        it('should update product stock', async () => {
            const response = await request(app)
                .put(`/api/admin/products/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    stock: 75,
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.stock).toBe(75);
        });

        it('should update product price', async () => {
            const response = await request(app)
                .put(`/api/admin/products/${testProductId}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    price: 1299,
                })
                .expect(200);

            expect(response.body.success).toBe(true);
            expect(response.body.data.price).toBe(1299);
        });
    });

    describe('DELETE /api/admin/products/:id', () => {
        it('should delete product', async () => {
            // Create a product to delete
            const product = await prisma.product.create({
                data: {
                    name: 'Product To Delete',
                    slug: `product-to-delete-${uniqueSuffix}`,
                    description: 'Will be deleted',
                    price: 500,
                    stock: 10,
                    categoryId: testCategoryId,
                    isActive: true,
                    isFeatured: false,
                },
            });

            const response = await request(app)
                .delete(`/api/admin/products/${product.id}`)
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(200);

            expect(response.body.success).toBe(true);

            // Verify deletion
            const deletedProduct = await prisma.product.findUnique({
                where: { id: product.id },
            });
            expect(deletedProduct).toBeNull();
        });

        it('should fail to delete non-existent product', async () => {
            const response = await request(app)
                .delete('/api/admin/products/00000000-0000-0000-0000-000000000000')
                .set('Authorization', `Bearer ${adminToken}`)
                .expect(404);

            expect(response.body.success).toBe(false);
        });
    });
});
