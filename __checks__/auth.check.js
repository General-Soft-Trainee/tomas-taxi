/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://tomas-taxi.vercel.app/login');
  await page.locator('#email').fill('lebedevgrisha21@gmail.com');
  await page.locator('#password').fill('4815162342l');
  await page.locator('text="Login"').click();
  await page.waitForNavigation({ url: 'https://tomas-taxi.vercel.app/home' });

  await page.close();
  await browser.close();
}

run();
