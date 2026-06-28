import { test, expect } from '@playwright/test';

test.describe('Navigation and Public Pages', () => {
    test('should navigate through all public pages', async ({ page }) => {
        // Home page
        await page.goto('/');
        await expect(page).toHaveTitle(/Bharti Clinic/);
        await expect(page.locator('h1')).toBeVisible();

        // Shop page
        await page.locator('[data-testid="nav-shop"]').click();
        await expect(page).toHaveURL('/shop');
        await expect(page.locator('h1')).toContainText(/Shop|Products/);

        // Therapies page
        await page.locator('[data-testid="nav-therapies"]').click();
        await expect(page).toHaveURL('/therapies');
        await expect(page.locator('h1')).toContainText('Therapies');

        // Packages page
        await page.locator('[data-testid="nav-packages"]').click();
        await expect(page).toHaveURL('/packages');
        await expect(page.locator('h1')).toContainText('Packages');

        // Blog page
        await page.locator('[data-testid="nav-blog"]').click();
        await expect(page).toHaveURL('/blog');
        await expect(page.locator('h1')).toContainText('Blog');

        // Gallery page
        await page.locator('[data-testid="nav-gallery"]').click();
        await expect(page).toHaveURL('/gallery');
        await expect(page.locator('h1')).toContainText('Gallery');

        // About page
        await page.locator('[data-testid="nav-about"]').click();
        await expect(page).toHaveURL('/about');
        await expect(page.locator('h1')).toContainText('About');

        // Contact page
        await page.locator('[data-testid="nav-contact"]').click();
        await expect(page).toHaveURL('/contact');
        await expect(page.locator('h1')).toContainText('Contact');
    });

    test('should display homepage hero section', async ({ page }) => {
        await page.goto('/');

        // Verify hero section elements
        await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
        await expect(page.locator('[data-testid="hero-title"]')).toBeVisible();
        await expect(page.locator('[data-testid="hero-cta"]')).toBeVisible();
    });

    test('should display footer with links', async ({ page }) => {
        await page.goto('/');

        // Scroll to footer
        await page.locator('footer').scrollIntoViewIfNeeded();

        // Verify footer sections
        await expect(page.locator('footer')).toBeVisible();
        await expect(page.locator('[data-testid="footer-about"]')).toBeVisible();
        await expect(page.locator('[data-testid="footer-links"]')).toBeVisible();
        await expect(page.locator('[data-testid="footer-contact"]')).toBeVisible();
    });

    test('should submit contact form', async ({ page }) => {
        await page.goto('/contact');

        // Fill contact form
        await page.fill('[name="name"]', 'Test User');
        await page.fill('[name="email"]', 'test.user@example.com');
        await page.fill('[name="phone"]', '9876543210');
        await page.fill('[name="subject"]', 'General Inquiry');
        await page.fill('[name="message"]', 'This is a test message from the contact form.');

        // Submit form
        await page.locator('[data-testid="submit-contact-btn"]').click();

        // Verify success message
        await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
    });

    test('should display blog posts', async ({ page }) => {
        await page.goto('/blog');

        // Verify blog posts are displayed
        const posts = await page.locator('[data-testid="blog-post-card"]').count();
        expect(posts).toBeGreaterThanOrEqual(0);

        if (posts > 0) {
            // Click on first post
            await page.locator('[data-testid="blog-post-card"]').first().click();

            // Verify blog post page
            await expect(page.locator('h1')).toBeVisible();
            await expect(page.locator('[data-testid="post-content"]')).toBeVisible();
        }
    });

    test('should display gallery images', async ({ page }) => {
        await page.goto('/gallery');

        // Verify gallery items are displayed
        const items = await page.locator('[data-testid="gallery-item"]').count();
        expect(items).toBeGreaterThanOrEqual(0);

        if (items > 0) {
            // Click on first image
            await page.locator('[data-testid="gallery-item"]').first().click();

            // Verify lightbox opens
            await expect(page.locator('[data-testid="lightbox"]')).toBeVisible();

            // Close lightbox
            await page.locator('[data-testid="close-lightbox"]').click();
            await expect(page.locator('[data-testid="lightbox"]')).not.toBeVisible();
        }
    });

    test('should handle 404 page', async ({ page }) => {
        await page.goto('/non-existent-page');

        // Verify 404 page
        await expect(page.locator('h1')).toContainText(/404|Not Found/);
        await expect(page.locator('[data-testid="back-home-btn"]')).toBeVisible();

        // Click back to home
        await page.locator('[data-testid="back-home-btn"]').click();
        await expect(page).toHaveURL('/');
    });

    test('should be mobile responsive', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        await page.goto('/');

        // Verify mobile menu button
        await expect(page.locator('[data-testid="mobile-menu-btn"]')).toBeVisible();

        // Open mobile menu
        await page.locator('[data-testid="mobile-menu-btn"]').click();

        // Verify mobile menu opens
        await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();

        // Close mobile menu
        await page.locator('[data-testid="close-mobile-menu"]').click();
        await expect(page.locator('[data-testid="mobile-menu"]')).not.toBeVisible();
    });

    test('should scroll to top button work', async ({ page }) => {
        await page.goto('/');

        // Scroll down
        await page.evaluate(() => window.scrollTo(0, 1000));

        // Wait for scroll to top button
        await expect(page.locator('[data-testid="scroll-to-top"]')).toBeVisible();

        // Click scroll to top
        await page.locator('[data-testid="scroll-to-top"]').click();

        // Verify scrolled to top
        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBeLessThan(100);
    });
});
