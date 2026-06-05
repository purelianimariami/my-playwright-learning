import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Final Project E2E Tests', () => {

    // Navigate to the base URL before each test
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
    });

    test('User should be able to complete a full purchase journey', async ({ page }) => {
        // 1. Login with standard user
        await page.getByPlaceholder('Username').fill('standard_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/inventory/);

        // 2. Add a product to the cart
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');

        // 3. Navigate to the cart and proceed to checkout
        await page.locator('.shopping_cart_link').click();
        await page.locator('[data-test="checkout"]').click();

        // 4. Fill in the Checkout Information
        await page.locator('[data-test="firstName"]').fill('Mariam');
        await page.locator('[data-test="lastName"]').fill('Pureliani');
        await page.locator('[data-test="postalCode"]').fill('0100');
        await page.locator('[data-test="continue"]').click();

        // 5. Review the order and Finish
        await expect(page).toHaveURL(/checkout-step-two/);
        await page.locator('[data-test="finish"]').click();

        // 6. Verify the order confirmation message
        const successHeader = page.locator('.complete-header');
        await expect(successHeader).toHaveText('Thank you for your order!');
    });

    test('Should show error message for locked out user', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('locked_out_user');
        await page.getByPlaceholder('Password').fill('secret_sauce');
        await page.getByRole('button', { name: 'Login' }).click();

        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    });
});