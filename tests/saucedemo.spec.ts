import { test, expect } from '@playwright/test';

test.describe('SauceDemo Test Suite', () => {

  // Navigate to the base URL before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Task 5: Empty form validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    const error = page.locator('[data-test="error"]');
    await expect(error, 'Error message should be displayed for empty username').toContainText('Epic sadface: Username is required');
  });

  // Group of tests that require authentication
  test.describe('Authorized User Tests', () => {
    
    // Automatically login before each test in this group
    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();
    });

    test('Task 1: Successful authorization', async ({ page }) => {
      await expect(page, 'URL should contain inventory').toHaveURL(/inventory/);
    });

    test('Task 3: Add product to cart', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      const badge = page.locator('.shopping_cart_badge');
      await expect(badge, 'Cart badge should display 1').toHaveText('1');
    });

    test('Task 4: Remove product from cart', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
      const badge = page.locator('.shopping_cart_badge');
      await expect(badge, 'Cart badge should not be visible').not.toBeVisible();
    });
  });
});