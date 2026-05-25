// Get the tools we need from Playwright to write and check tests
import { test, expect } from '@playwright/test';

// Start a new test called 'has title' and open a browser page
test('has title', async ({ page }) => {
  
  // Go to the Playwright website and wait for it to load
  await page.goto('https://playwright.dev/');
  
  // Check if the page title has the word "Playwright" in it
  await expect(page).toHaveTitle(/Playwright/);
});

// Start another test called 'get started link'
test('get started link', async ({ page }) => {
  
  // Go to the Playwright website again
  await page.goto('https://playwright.dev/');

  // Find the "Get started" link and click it
  await page.getByRole('link', { name: 'Get started' }).click();

  // Check if the "Installation" text is visible on the screen
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});