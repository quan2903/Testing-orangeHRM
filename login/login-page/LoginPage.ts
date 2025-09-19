import {Page} from 'playwright';

export class LoginPage {
  
  constructor(public page: Page) {
  }
    async goto() {
      await this.page.goto('auth/login');
    }
    async login(username: string, password: string) {
        await this.page.goto('auth/login'); 
        await this.page.getByRole('textbox', { name: 'Username' }).click();
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).press('Enter');
    }
}
