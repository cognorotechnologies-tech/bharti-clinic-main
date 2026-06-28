import { test, expect } from '@playwright/test';

test.describe('Therapy Booking Flow', () => {
    test('should book a therapy appointment', async ({ page }) => {
        // Navigate to therapies page
        await page.goto('/therapies');
        await expect(page).toHaveTitle(/Therapies|Bharti Clinic/);

        // Wait for therapies to load
        await page.waitForSelector('[data-testid="therapy-card"]', { timeout: 10000 });

        // Click on first therapy
        await page.locator('[data-testid="therapy-card"]').first().click();

        // Verify therapy detail page
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('[data-testid="therapy-price"]')).toBeVisible();

        // Click book now button
        await page.locator('[data-testid="book-now-btn"]').click();

        // Verify booking modal opens
        await expect(page.locator('[data-testid="booking-modal"]')).toBeVisible();

        // Fill booking form
        await page.fill('[name="patientName"]', 'Jane Smith');
        await page.fill('[name="phone"]', '9876543210');
        await page.fill('[name="email"]', 'jane.smith@example.com');

        // Select date (tomorrow)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dateString = tomorrow.toISOString().split('T')[0];
        await page.fill('[name="preferredDate"]', dateString);

        // Select time
        await page.selectOption('[name="preferredTime"]', '10:00 AM');

        // Add notes
        await page.fill('[name="notes"]', 'First time booking, looking forward to the therapy');

        // Submit booking
        await page.locator('[data-testid="submit-booking-btn"]').click();

        // Verify success message
        await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
        await expect(page.locator('[data-testid="success-message"]')).toContainText('Booking Confirmed');
    });

    test('should validate required fields in booking form', async ({ page }) => {
        await page.goto('/therapies');
        await page.locator('[data-testid="therapy-card"]').first().click();
        await page.locator('[data-testid="book-now-btn"]').click();

        // Try to submit without filling form
        await page.locator('[data-testid="submit-booking-btn"]').click();

        // Verify validation errors
        await expect(page.locator('[data-testid="error-message"]')).toBeVisible();
    });

    test('should browse therapy packages', async ({ page }) => {
        await page.goto('/packages');
        await expect(page).toHaveTitle(/Packages|Bharti Clinic/);

        // Verify packages are displayed
        const packages = await page.locator('[data-testid="package-card"]').count();
        expect(packages).toBeGreaterThan(0);

        // Click on first package
        await page.locator('[data-testid="package-card"]').first().click();

        // Verify package details
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('[data-testid="package-price"]')).toBeVisible();
        await expect(page.locator('[data-testid="package-savings"]')).toBeVisible();
    });
});
