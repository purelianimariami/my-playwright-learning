import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test.describe("SauceDemo Final Project", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Successful login journey", async ({ page }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await expect(page, "Should redirect to inventory page after login").toHaveURL(/inventory/);
  });

  test("Negative login - locked out user", async () => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await expect(loginPage.errorMessage, "Error message for locked user should be visible").toBeVisible();
    await expect(loginPage.errorMessage, "Error message should contain specific text").toContainText("Sorry, this user has been locked out");
  });
});