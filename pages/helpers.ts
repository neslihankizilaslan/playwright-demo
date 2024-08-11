import { Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
}

export async function createUser(page: Page, employeeId: number) {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
  await page.getByPlaceholder('First Name').fill('Test');
  await page.getByPlaceholder('Last Name').fill('FMSS test');
  const employeeIdInput = page.locator('input').nth(5);
  await employeeIdInput.click({ clickCount: 2 });
  await employeeIdInput.press('Backspace');
  await employeeIdInput.fill(employeeId.toString());
  await page.getByRole('button', { name: 'Save' }).click();
  await page.waitForURL(/^https:\/\/opensource-demo\.orangehrmlive\.com\/web\/index\.php\/pim\/viewPersonalDetails\/empNumber\/\d+$/);
}