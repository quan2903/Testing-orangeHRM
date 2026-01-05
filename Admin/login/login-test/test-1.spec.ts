import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost/orangehrm-5.7/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('thaianhquan');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('Quan@@dzdz111113');
  await page.getByRole('textbox', { name: 'Password' }).press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.locator('.oxd-button').first().click();
  await page.getByRole('textbox', { name: 'dd-mm-yyyy' }).first().click();
  await page.getByRole('textbox', { name: 'dd-mm-yyyy' }).first().fill('21-12-2022');
  await page.getByRole('textbox', { name: 'dd-mm-yyyy' }).first().press('Enter');
});