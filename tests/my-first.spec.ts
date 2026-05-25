import { test, expect } from '@playwright/test';

// POSITIVE test — ამოწმებს, რომ რაღაც ნამდვილად ისეა, როგორც ველოდებით
test('page has the correct title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

// NEGATIVE test — ამოწმებს, რომ რაღაც შეცდომა ან ტექსტი არ უნდა ჩანდეს
test('page does not contain error text', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // .not.toBeVisible() ნიშნავს: ველოდები, რომ ეს ელემენტი არ გამოჩნდება
  await expect(page.getByText('404 Page Not Found')).not.toBeVisible();
});