/* eslint-disable @typescript-eslint/no-var-requires */
const { test } = require('@playwright/test');

test.use({
  headless: true,
  baseURL: 'https://tomas-taxi.vercel.app'
});

test.describe.serial('Authentication', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test('Login', async () => {
    await page.goto('/login');
    await page.locator('#email').fill('lebedevgrisha21@gmail.com');
    await page.locator('#password').fill('4815162342');
    await page.locator('text="Login"').click();
    await page.waitForNavigation({ url: '/home' });
  });

  test.afterAll(async () => {
    await page.close();
  });
});
