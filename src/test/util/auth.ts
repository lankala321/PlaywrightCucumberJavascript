import { Page } from "@playwright/test";
import { LoginPageLocators } from "../objectRepository/loginPage";

export async function loginAsStandardUser(page: Page, username: string, password: string) {
  const baseUrl = process.env.BASE_URL;
  await page.goto(baseUrl);
  await page.fill(LoginPageLocators.usernameInput, username);
  await page.fill(LoginPageLocators.passwordInput, password);
  await Promise.all([
    page.waitForURL("**/inventory.html"),
    page.click(LoginPageLocators.loginButton)
  ]);
}
