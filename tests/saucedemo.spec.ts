import { test, expect } from '@playwright/test';

test.describe('SauceDemo ტესტების ნაკრები', () => {

  // ყოველი ტესტის წინ შევალთ საიტზე
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Task 5: ცარიელი ფორმის ვალიდაცია', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    const error = page.locator('[data-test="error"]');
    await expect(error, 'უნდა გამოჩნდეს შეცდომა ცარიელ იუზერზე').toContainText('Epic sadface: Username is required');
  });

  // ცალკე ჯგუფი ტესტებისთვის, რომლებსაც სჭირდებათ Login
  test.describe('ავტორიზებული მომხმარებლის ტესტები', () => {
    
    // ამ ჯგუფის ყოველი ტესტის წინ ავტომატურად გაივლის Login-ს
    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder('Username').fill('standard_user');
      await page.getByPlaceholder('Password').fill('secret_sauce');
      await page.getByRole('button', { name: 'Login' }).click();
    });

    test('Task 1: წარმატებული ავტორიზაცია', async ({ page }) => {
      await expect(page, 'URL უნდა შეიცავდეს inventory-ს').toHaveURL(/inventory/);
    });

    test('Task 3: პროდუქტის დამატება კალათაში', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      const badge = page.locator('.shopping_cart_badge');
      await expect(badge, 'კალათის ნიშანი უნდა აჩვენებდეს 1-ს').toHaveText('1');
    });

    test('Task 4: პროდუქტის წაშლა კალათიდან', async ({ page }) => {
      await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
      const badge = page.locator('.shopping_cart_badge');
      await expect(badge, 'კალათის ნიშანი არ უნდა ჩანდეს').not.toBeVisible();
    });
  });
});