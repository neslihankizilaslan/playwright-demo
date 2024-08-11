import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';

test('login success', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.getUsernameInput.fill('Admin');
  await login.getPasswordInput.fill('admin123');
  await login.getLoginButton.click();
  await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});

test('login failure', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.getUsernameInput.fill('Admin');
  await login.getPasswordInput.fill('admin1234');
  await login.getLoginButton.click();
  await expect(page.getByText('Invalid credentials')).toBeVisible();
});