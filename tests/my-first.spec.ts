import { test, expect } from '@playwright/test';

// POSITIVE test — verifies that the page title is exactly as expected
test('page has the correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// NEGATIVE test — verifies that an error message or specific text is not visible
test('page does not contain error text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // .not.toBeVisible() ensures that the element is hidden or missing from the page
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
});