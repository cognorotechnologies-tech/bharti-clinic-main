import { test, expect } from '@playwright/test';

test.describe('Review Submission Flow', () => {
    test('should submit a product review', async ({ page }) => {
        // Navigate to product page
        await page.goto('/shop');
        await page.locator('[data-testid="product-card"]').first().click();

        // Scroll to reviews section
        await page.locator('[data-testid="reviews-section"]').scrollIntoViewIfNeeded();

        // Click write review button
        await page.locator('[data-testid="write-review-btn"]').click();

        // Verify review modal opens
        await expect(page.locator('[data-testid="review-modal"]')).toBeVisible();

        // Fill review form
        await page.fill('[name="patientName"]', 'Happy Customer');
        await page.fill('[name="email"]', 'happy.customer@example.com');

        // Select rating (5 stars)
        await page.locator('[data-testid="star-5"]').click();

        // Write comment
        await page.fill('[name="comment"]', 'Excellent product! Highly recommend. The quality is outstanding and I noticed results within a week.');

        // Submit review
        await page.locator('[data-testid="submit-review-btn"]').click();

        // Verify success message
        await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
        await expect(page.locator('[data-testid="success-message"]')).toContainText('Review submitted');
    });

    test('should validate review form fields', async ({ page }) => {
        await page.goto('/shop');
        await page.locator('[data-testid="product-card"]').first().click();
        await page.locator('[data-testid="write-review-btn"]').click();

        // Try to submit without filling form
        await page.locator('[data-testid="submit-review-btn"]').click();

        // Verify validation errors
        await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    });

    test('should display existing reviews', async ({ page }) => {
        await page.goto('/shop');
        await page.locator('[data-testid="product-card"]').first().click();

        // Scroll to reviews section
        await page.locator('[data-testid="reviews-section"]').scrollIntoViewIfNeeded();

        // Check if reviews are displayed
        const reviewCount = await page.locator('[data-testid="review-item"]').count();
        
        if (reviewCount > 0) {
            // Verify review structure
            await expect(page.locator('[data-testid="review-item"]').first()).toBeVisible();
            await expect(page.locator('[data-testid="review-rating"]').first()).toBeVisible();
            await expect(page.locator('[data-testid="review-comment"]').first()).toBeVisible();
        }
    });

    test('admin should approve review', async ({ page }) => {
        // Login as admin
        await page.goto('/admin/login');
        await page.fill('[name="email"]', 'dr.ipinder@bhartiveda.com');
        await page.fill('[name="password"]', 'password123');
        await page.locator('[data-testid="login-btn"]').click();

        // Navigate to reviews
        await page.goto('/admin/reviews');

        // Filter pending reviews
        await page.locator('[data-testid="filter-pending"]').click();

        // Check if there are pending reviews
        const pendingCount = await page.locator('[data-testid="pending-review"]').count();

        if (pendingCount > 0) {
            // Approve first review
            await page.locator('[data-testid="approve-review"]').first().click();

            // Verify success
            await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();

            // Verify review moved to approved
            await page.locator('[data-testid="filter-approved"]').click();
            await expect(page.locator('[data-testid="approved-review"]')).toHaveCount(pendingCount);
        }
    });

    test('admin should reject review', async ({ page }) => {
        // Login as admin
        await page.goto('/admin/login');
        await page.fill('[name="email"]', 'dr.ipinder@bhartiveda.com');
        await page.fill('[name="password"]', 'password123');
        await page.locator('[data-testid="login-btn"]').click();

        // Navigate to reviews
        await page.goto('/admin/reviews');

        // Filter pending reviews
        await page.locator('[data-testid="filter-pending"]').click();

        const pendingCount = await page.locator('[data-testid="pending-review"]').count();

        if (pendingCount > 0) {
            // Reject first review
            await page.locator('[data-testid="reject-review"]').first().click();

            // Verify success
            await expect(page.locator('[data-testid="success-toast"]')).toBeVisible();
        }
    });
});
