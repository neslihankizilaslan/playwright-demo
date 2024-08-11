import { Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly getUsernameInput: Locator;
  readonly getPasswordInput: Locator;
  readonly getLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getUsernameInput = page.getByPlaceholder('Username');
    this.getPasswordInput = page.getByPlaceholder('Password');
    this.getLoginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }
}