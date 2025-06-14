import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { config } from "dotenv";
import { fixture } from "../../framework/fixtures/pageFixture";
import { LoginPageLocators } from "../objectRepository/loginPage";

// Load env variables
const envFile = `.env.${process.env.ENV}`;

// Load env vars from the specified file, overriding system envs
config({ path: envFile});

// Try to resolve from .env, otherwise use the raw value directly
function resolveCredential(value: string): string {
  if (!value) return "";
  const fromEnv = process.env[value];
  return fromEnv ?? value;
}

Given("I navigate to the SauceDemo login page", async () => {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl) throw new Error(`BASE_URL not defined in ${envFile}`);
});

When("I login using {string} and {string}", async (username: string, password: string) => {
  const resolvedUsername = resolveCredential(username);
  const resolvedPassword = resolveCredential(password);

  // Clear and fill username
  await fixture.page.locator(LoginPageLocators.usernameInput).fill(resolvedUsername);
  // Clear and fill password
  await fixture.page.locator(LoginPageLocators.passwordInput).fill(resolvedPassword);
  // Click login
  await fixture.page.locator(LoginPageLocators.loginButton).click();
});

Then("I should see {string}", async (expectedText: string) => {
  const bodyText = await fixture.page.locator("body").textContent();
  expect(bodyText?.toLowerCase()).toContain(expectedText.toLowerCase());
});
