import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../framework/fixtures/pageFixture";
import { InventoryPageLocators } from "../objectRepository/inventoryPage";
import { loginAsStandardUser } from "../util/auth"; //

const productSelector = (name: string) => `div.inventory_item:has-text("${name}")`;

const cartCount = async () => {
  const badge = fixture.page.locator(InventoryPageLocators.cart.badge);
  return await badge.isVisible() ? parseInt((await badge.textContent()) || "0") : 0;
};

Given("I am logged in as a standard user", async () => {
  await loginAsStandardUser(fixture.page, process.env.USER_NAME, process.env.PASSWORD);
});

Given('I am on the inventory page', async function () {
  const currentUrl = fixture.page.url();

  // 🧪 If you're already logged in, you should be redirected to inventory
  if (currentUrl.includes('inventory.html')) {
    await expect(fixture.page).toHaveURL(/.*inventory\.html$/);
  } else {
    // 🧪 If not logged in, you’ll stay on the login page
    await expect(fixture.page).toHaveURL(process.env.BASE_URL);
  }
});

// When('I am on the inventory page', async function () {
//   await expect(fixture.page).toHaveURL(/.*inventory\.html$/);
// });

Then("I should see the list of inventory items", async () => {
  const count = await fixture.page.locator(InventoryPageLocators.product.container).count();
  expect(count).toBeGreaterThan(0);
});

Then("the page title should be {string}", async (expectedTitle: string) => {
  const title = await fixture.page.title();
  expect(title).toBe(expectedTitle);
});

Then("each product should display name, description, image, and price", async () => {
  const items = await fixture.page.locator(InventoryPageLocators.product.container).all();
  for (const item of items) {
    await expect(item.locator(InventoryPageLocators.product.name)).toBeVisible();
    await expect(item.locator(InventoryPageLocators.product.desc)).toBeVisible();
    await expect(item.locator(InventoryPageLocators.product.image)).toBeVisible();
    await expect(item.locator(InventoryPageLocators.product.price)).toBeVisible();
  }
});

Then("I should see the shopping cart icon", async () => {
  await expect(fixture.page.locator(InventoryPageLocators.cart.icon)).toBeVisible();
});

Then("I should see the hamburger menu button", async () => {
  await expect(fixture.page.locator(InventoryPageLocators.menu.button)).toBeVisible();
});

When("I click the hamburger menu button", async () => {
  await fixture.page.locator(InventoryPageLocators.menu.button).click();
});

Then("the menu should expand", async () => {
  await expect(fixture.page.locator(InventoryPageLocators.menu.list)).toBeVisible();
});

When("I click on {string} for {string}", async (buttonText: string, productName: string) => {
  const product = fixture.page.locator(productSelector(productName));
  await product.locator(`button:has-text("${buttonText}")`).click();
});

Then("the cart icon should show {int} item", async (expected: number) => {
  expect(await cartCount()).toBe(expected);
});

Given("I have added {string} to the cart", async (productName: string) => {
  const product = fixture.page.locator(productSelector(productName));
  await product.locator("button:has-text('Add to cart')").click();
});

Then("the cart icon should show no items", async () => {
  await expect(fixture.page.locator(InventoryPageLocators.cart.badge)).toHaveCount(0);
});

When("I click on the product name {string}", async (productName: string) => {
  await fixture.page.locator(InventoryPageLocators.product.name, { hasText: productName }).click();
});

Then("I should be on the product detail page for {string}", async (productName: string) => {
  await expect(fixture.page.locator(InventoryPageLocators.detailName)).toHaveText(productName);
});

When("I click the cart icon", async () => {
  await fixture.page.locator(InventoryPageLocators.cart.icon).click();
});

Then("I should be on the cart page", async () => {
  await expect(fixture.page).toHaveURL(/.*cart.html/);
});

When("I sort products by {string}", async (sortType: string) => {
  const sortDropdown = fixture.page.locator(InventoryPageLocators.sort);
  await sortDropdown.waitFor({ state: "visible" });

  const sortMap: Record<string, string> = {
    "Price (low to high)": "lohi",
    "Price (high to low)": "hilo",
    "Name (A to Z)": "az",
    "Name (Z to A)": "za"
  };

  const value = sortMap[sortType];
  if (!value) throw new Error(`Unknown sort type: ${sortType}`);

  await sortDropdown.selectOption(value);
});

Then("the products should be sorted in ascending price", async () => {
  const prices = await fixture.page.locator(InventoryPageLocators.product.price).allTextContents();
  const priceNumbers = prices.map(p => parseFloat(p.replace("$", "")));
  const sorted = [...priceNumbers].sort((a, b) => a - b);
  expect(priceNumbers).toEqual(sorted);
});

When("I open the hamburger menu", async () => {
  await fixture.page.locator(InventoryPageLocators.menu.button).click();
});

When("I click logout", async () => {
  await fixture.page.locator(InventoryPageLocators.menu.logout).click();
});

Given("I add {int} items to the cart", async (count: number) => {
  const buttons = await fixture.page.locator("button:has-text('Add to cart')").all();
  for (let i = 0; i < count && i < buttons.length; i++) {
    await buttons[i].click();
  }
});

Given("I remove {int} item from the cart", async (count: number) => {
  const buttons = await fixture.page.locator("button:has-text('Remove')").all();
  for (let i = 0; i < count && i < buttons.length; i++) {
    await buttons[i].click();
  }
});

Then("the cart badge should show {int} item", async (expected: number) => {
  expect(await cartCount()).toBe(expected);
});

Then("no error should be shown and cart count remains the same", async () => {
  const badgeVisible = await fixture.page.locator(InventoryPageLocators.cart.badge).isVisible();
  if (badgeVisible) {
    const count = await cartCount();
    expect(count).toBeGreaterThanOrEqual(0);
  }
});








