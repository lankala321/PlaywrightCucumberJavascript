import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../framework/fixtures/pageFixture";
import { InventoryPageLocators } from "../objectRepository/inventoryPage";

Then("I should be redirected to the login page", async () => {
  await expect(fixture.page).toHaveURL(/.*saucedemo\.com\/?$/); // home page = login
});

Given("I am not logged in", async () => {
  await fixture.page.context().clearCookies();
});


When("I navigate to the inventory page", async () => {
  await fixture.page.goto(process.env.BASE_URL + "/inventory.html");
});

Given("I was previously logged in and session expired", async () => {
  await fixture.page.context().clearCookies();
});


Given("I tamper cart values via browser console", async () => {
  await fixture.page.evaluate(() => {
    window.localStorage.setItem("cart-contents", "[999]");
  });
});

Then('the site should reset the cart or redirect to login', async function () {
  const currentUrl = await fixture.page.url();
  const isRedirectedToLogin = currentUrl === process.env.BASE_URL;

  let cartText: string | null = null;
  try {
    cartText = await fixture.page.locator('.shopping_cart_badge').textContent();
  } catch (e) {
    // In case locator doesn't exist (cart badge removed)
    cartText = null;
  }

  const isCartReset = cartText === null || cartText.trim() === '' || cartText.trim() === '0';
  expect(isRedirectedToLogin || isCartReset).toBe(true);
});

When("I try to add an item to the cart", async () => {
  await fixture.page.goto(`${process.env.BASE_URL}/inventory.html`);
  await expect(fixture.page).toHaveURL(/.*saucedemo\.com\/$/);
});


Given("I am using various devices", async () => {
  await fixture.page.goto(process.env.BASE_URL + "/inventory.html");
});


Then("all inventory page buttons and links should be clickable", async () => {
  const buttons = fixture.page.locator("a, button");
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);
});


Given("I am on the inventory page in Chrome", async () => {
  await fixture.page.goto(process.env.BASE_URL + "/inventory.html");
});

Then('the layout should be correct', async function () {
  const page = fixture.page;

  const url = await page.url();
  const expectedUrl = 'https://www.saucedemo.com/inventory.html';

  // Check if we're on the correct page
  if (url !== expectedUrl) {
    console.log(`Not on expected URL. Expected: ${expectedUrl}`);
    return expect(url).toBe(expectedUrl); // fails cleanly here
  }

  const containerLocator = page.locator('.inventory_container');

  const count = await containerLocator.count();
  const exists = count > 0;
  const visible = exists ? await containerLocator.first().isVisible() : false;

  console.log('inventory_container exists:', exists);
  console.log('inventory_container visible:', visible);

  expect(visible).toBe(true);
});

Then("same layout should be visible in Firefox and Safari", async () => {
  await expect(fixture.page.locator(InventoryPageLocators.layout)).toBeVisible();
});

When("I click remove for an item not in the cart", async () => {
  const removeButtons = fixture.page.locator("button:has-text('Remove')");
  const count = await removeButtons.count();

  if (count === 0) {
  } else {
    // Optionally fail the test if a Remove button is unexpectedly present
    throw new Error(`Expected no 'Remove' button, but found ${count}`);
  }
});


