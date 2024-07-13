import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
    console.log(`\t\t==> Attempted to log in with username: ${username}`);

    // Check for login error
    const errorElement = await this.page.$('.error-message-container');
    if (errorElement) {
      const errorMessage = await errorElement.textContent();
      throw new Error(`Login failed with error message: ${errorMessage}`);
    }

    // Check if navigated to inventory page
    const isOnInventoryPage =
      (await this.page.url()) === 'https://www.saucedemo.com/inventory.html';
    if (!isOnInventoryPage) {
      throw new Error('Login failed: Not redirected to inventory page.');
    } else {
      console.log(`\t\t==> Successfully logged in and navigated to inventory page.`);
    }
  }
}
