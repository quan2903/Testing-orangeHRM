import {Page} from 'playwright';

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
  require('dotenv').config(); 
}

export class LoginPage {
  
  constructor(public page: Page) {
  }
 async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
      waitUntil: 'domcontentloaded', // nhanh hơn 'load'
      timeout: 30000
    });
  }
    async login(username: string, password: string) {
        await this.page.getByRole('textbox', { name: 'Username' }).click();
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).click();
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Login' }).press('Enter');
    }
}
