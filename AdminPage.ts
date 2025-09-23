import { Page } from "playwright-core";

export class AdminPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.getByRole('link').filter({ hasText: 'Admin' }).click();
     await this.page.waitForURL('/admin/viewAdminModule', { timeout: 30000 });
  await this.page.waitForSelector('h6:has-text("Admin")', { timeout: 30000 });
  }


}
