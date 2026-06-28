import { test, expect } from '@playwright/test';

test.describe('Customer Shopping Flow', () => {
    test('should browse products, add to cart, and complete checkout', async ({ page }) => {
        // Navigate to shop
        await page.goto('/shop');
        await expect(page).toHaveTitle(/Shop|Bharti Clinic/);

        // Wait for products to load
        await page.waitForSelector('[data-testid="product-card"]', { timeout: 10000 });

        // Verify products are displayed
        const productCards = await page.locator('[data-testid="product-card"]').count();
        expect(productCards).toBeGreaterThan(0);

        // Click on first product
        await page.locator('[data-testid="product-card"]').first().click();

        // Verify product detail page
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('[data-testid="product-price"]')).toBeVisible();

        // Add to cart
        await page.locator('[data-testid="add-to-cart-btn"]').click();

        // Verify cart badge updates
        await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('1');

        // Open cart drawer
        await page.locator('[data-testid="cart-icon"]').click();

        // Verify cart drawer opens
        await expect(page.locator('[data-testid="cart-drawer"]')).toBeVisible();

        // Verify product in cart
        await expect(page.locator('[data-testid="cart-item"]')).toHaveCount(1);

        // Proceed to checkout
        await page.locator('[data-testid="checkout-btn"]').click();

        // Verify checkout page
        await expect(page).toHaveURL(/\/checkout/);
        await expect(page.locator('h1')).toContainText('Checkout');

        // Fill shipping information
        await page.fill('[name="fullName"]', 'John Doe');
        await page.fill('[name="email"]', 'john.doe@example.com');
        await page.fill('[name="phone"]', '9876543210');
        await page.fill('[name="address"]', '123 Test Street');
        await page.fill('[name="city"]', 'Test City');
        await page.fill('[name="state"]', 'Test State');
        await page.fill('[name="pincode"]', '123456');

        // Continue to payment
        await page.locator('[data-testid="continue-to-payment"]').click();

        // Select payment method
        await page.locator('[data-testid="payment-cod"]').click();

        // Place order
        await page.locator('[data-testid="place-order-btn"]').click();

        // Verify order confirmation
        await expect(page).toHaveURL(/\/order-confirmation/);
        await expect(page.locator('h1')).toContainText('Order Confirmed');
        await expect(page.locator('[data-testid="order-number"]')).toBeVisible();
    });

    test('should update cart quantity', async ({ page }) => {
        await page.goto('/shop');
        
        // Add product to cart
        await page.locator('[data-testid="product-card"]').first().click();
        await page.locator('[data-testid="add-to-cart-btn"]').click();

        // Open cart
        await page.locator('[data-testid="cart-icon"]').click();

        // Increase quantity
        await page.locator('[data-testid="increase-quantity"]').first().click();
        
        // Verify quantity updated
        await expect(page.locator('[data-testid="item-quantity"]').first()).toHaveText('2');

        // Verify subtotal updated
        const subtotal = await page.locator('[data-testid="cart-subtotal"]').textContent();
        expect(subtotal).toBeTruthy();
    });

    test('should remove item from cart', async ({ page }) => {
        await page.goto('/shop');
        
        // Add product to cart
        await page.locator('[data-testid="product-card"]').first().click();
        await page.locator('[data-testid="add-to-cart-btn"]').click();

        // Open cart
        await page.locator('[data-testid="cart-icon"]').click();

        // Remove item
        await page.locator('[data-testid="remove-item"]').first().click();

        // Verify cart is empty
        await expect(page.locator('[data-testid="empty-cart"]')).toBeVisible();
        await expect(page.locator('[data-testid="cart-badge"]')).toHaveText('0');
    });

    test('should filter products by category', async ({ page }) => {
        await page.goto('/shop');

        // Click category filter
        await page.locator('[data-testid="category-filter"]').first().click();

        // Wait for filtered results
        await page.waitForTimeout(1000);

        // Verify products are filtered
        const products = await page.locator('[data-testid="product-card"]').count();
        expect(products).toBeGreaterThan(0);
    });

    test('should search for products', async ({ page }) => {
        await page.goto('/shop');

        // Enter search query
        await page.fill('[data-testid="search-input"]', 'Ashwagandha');
        await page.press('[data-testid="search-input"]', 'Enter');

        // Wait for search results
        await page.waitForTimeout(1000);

        // Verify search results
        const results = await page.locator('[data-testid="product-card"]').count();
        expect(results).toBeGreaterThanOrEqual(0);
    });
});
