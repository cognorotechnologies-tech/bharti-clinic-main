import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - Basic Functionality', () => {
    test('should load homepage', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Bharti/i);
    });

    test('should navigate to shop page', async ({ page }) => {
        await page.goto('/shop');
        
        // Wait for page to load
        await page.waitForLoadState('networkidle');
        
        // Check if we're on the shop page
        await expect(page).toHaveURL(/.*shop/);
    });

    test('should find navigation links', async ({ page }) => {
        await page.goto('/');
        
        // Check for navigation test IDs (desktop version)
        await expect(page.locator('[data-testid="nav-shop-desktop"]')).toBeVisible();
        await expect(page.locator('[data-testid="nav-therapies-desktop"]')).toBeVisible();
        await expect(page.locator('[data-testid="nav-about-desktop"]')).toBeVisible();
    });

    test('should find cart icon', async ({ page }) => {
        await page.goto('/');
        
        // Check for cart icon (desktop version)
        await expect(page.locator('[data-testid="cart-icon-desktop"]')).toBeVisible();
    });

    test('should load products on shop page', async ({ page }) => {
        await page.goto('/shop');
        
        // Wait for products to load
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(2000); // Give time for API call
        
        // Check if product cards exist
        const productCards = page.locator('[data-testid="product-card"]');
        const count = await productCards.count();
        
        console.log(`Found ${count} product cards`);
        expect(count).toBeGreaterThan(0);
    });

    test('should open cart drawer', async ({ page }) => {
        await page.goto('/');
        
        // Click cart icon (desktop version)
        await page.locator('[data-testid="cart-icon-desktop"]').click();
        
        // Wait for cart drawer to appear
        await page.waitForTimeout(500);
        
        // Check if cart drawer is visible
        await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();
    });
});
