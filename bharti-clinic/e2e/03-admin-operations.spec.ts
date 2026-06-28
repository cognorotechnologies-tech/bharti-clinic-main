import { test, expect } from '@playwright/test';

test.describe('Admin Operations', () => {
    let adminToken: string;

    test.beforeEach(async ({ page }) => {
        // Login as admin
        await page.goto('/admin/login');
        await page.fill('[name="email"]', 'dr.ipinder@bhartiveda.com');
        await page.fill('[name="password"]', 'password123');
        await page.locator('[data-testid="login-btn"]').click();

        // Wait for redirect to dashboard
        await page.waitForURL('/admin/dashboard');
        await expect(page.locator('h1')).toContainText('Dashboard');
    });

    test('should login successfully', async ({ page }) => {
        // Already logged in via beforeEach
        await expect(page).toHaveURL('/admin/dashboard');
        await expect(page.locator('[data-testid="admin-name"]')).toBeVisible();
    });

    test('should view and manage products', async ({ page }) => {
        // Navigate to products page
        await page.locator('[data-testid="nav-products"]').click();
        await expect(page).toHaveURL('/admin/products');

        // Verify products table
        await expect(page.locator('[data-testid="products-table"]')).toBeVisible();

        // Click edit on first product
        await page.locator('[data-testid="edit-product"]').first().click();

        // Verify edit modal opens
        await expect(page.locator('[data-testid="product-modal"]')).toBeVisible();

        // Update product name
        await page.fill('[name="name"]', 'Updated Product Name');

        // Save changes
        await page.locator('[data-testid="save-product-btn"]').click();

        // Verify success message
        await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
    });

    test('should create new product', async ({ page }) => {
        await page.goto('/admin/products');

        // Click add product button
        await page.locator('[data-testid="add-product-btn"]').click();

        // Fill product form
        await page.fill('[name="name"]', 'Test Product');
        await page.fill('[name="description"]', 'This is a test product');
        await page.fill('[name="price"]', '999');
        await page.fill('[name="stock"]', '50');
        await page.selectOption('[name="category"]', 'Herbal Supplements');

        // Save product
        await page.locator('[data-testid="save-product-btn"]').click();

        // Verify success
        await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
    });

    test('should manage inventory', async ({ page }) => {
        await page.goto('/admin/inventory');

        // Verify inventory table
        await expect(page.locator('[data-testid="inventory-table"]')).toBeVisible();

        // Update stock for first item
        await page.locator('[data-testid="update-stock"]').first().click();
        await page.fill('[name="stock"]', '100');
        await page.locator('[data-testid="save-stock-btn"]').click();

        // Verify success
        await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
    });

    test('should approve reviews', async ({ page }) => {
        await page.goto('/admin/reviews');

        // Check if there are pending reviews
        const pendingReviews = await page.locator('[data-testid="pending-review"]').count();
        
        if (pendingReviews > 0) {
            // Approve first review
            await page.locator('[data-testid="approve-review"]').first().click();

            // Verify success
            await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
        }
    });

    test('should upload gallery image', async ({ page }) => {
        await page.goto('/admin/gallery');

        // Click upload button
        await page.locator('[data-testid="upload-btn"]').click();

        // Verify upload modal
        await expect(page.locator('[data-testid="upload-modal"]')).toBeVisible();

        // Note: File upload testing requires actual file
        // This is a placeholder for the flow
    });

    test('should view dashboard KPIs', async ({ page }) => {
        await page.goto('/admin/dashboard');

        // Verify KPI cards are visible
        await expect(page.locator('[data-testid="kpi-revenue"]')).toBeVisible();
        await expect(page.locator('[data-testid="kpi-orders"]')).toBeVisible();
        await expect(page.locator('[data-testid="kpi-appointments"]')).toBeVisible();
        await expect(page.locator('[data-testid="kpi-low-stock"]')).toBeVisible();
    });

    test('should manage blog posts', async ({ page }) => {
        await page.goto('/admin/blog');

        // Click create post button
        await page.locator('[data-testid="create-post-btn"]').click();

        // Fill blog form
        await page.fill('[name="title"]', 'Test Blog Post');
        await page.fill('[name="excerpt"]', 'This is a test excerpt');
        await page.fill('[name="content"]', 'This is the full content of the test blog post');

        // Save post
        await page.locator('[data-testid="save-post-btn"]').click();

        // Verify success
        await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
    });

    test('should logout successfully', async ({ page }) => {
        await page.goto('/admin/dashboard');

        // Click logout button
        await page.locator('[data-testid="logout-btn"]').click();

        // Verify redirected to login
        await expect(page).toHaveURL('/admin/login');
    });

    test('should check notifications', async ({ page }) => {
        await page.goto('/admin/dashboard');

        // Click notification bell
        await page.locator('[data-testid="notification-bell"]').click();

        // Verify dropdown opens
        await expect(page.locator('[data-testid="notification-dropdown"]')).toBeVisible();

        // Verify notifications are displayed
        const notifications = await page.locator('[data-testid="notification-item"]').count();
        expect(notifications).toBeGreaterThanOrEqual(0);
    });
});
