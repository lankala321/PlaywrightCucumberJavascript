const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-credentials"]').click();
  await page.locator('[data-test="login-credentials-container"] div').first().click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="inventory-container"]').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
  await page.locator('[data-test="product-sort-container"]').selectOption('az');
  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();