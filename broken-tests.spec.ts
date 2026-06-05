import { test, expect } from "@playwright/test";

// Broken test #1 - გასწორებული
test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  // შეცდომა: იყო "User Name", უნდა იყოს "Username" (სფეისის გარეშე)
  await page.getByPlaceholder("Username").fill("standard_user"); 
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});

// Broken test #2 - გასწორებული
test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  // შეცდომა: ტექსტი უნდა შეიცავდეს "Epic sadface:"-ს
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username and password do not match"
  );
});

// Broken test #3 - გასწორებული
test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // შეცდომა: აკლდა "await" click-ის წინ
  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click(); 

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

//testcommentdiff