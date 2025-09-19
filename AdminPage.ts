import { Page } from "playwright-core";

export class AdminPage {
  constructor(public page: Page) {}

  async goto() {
    await this.page.getByRole('link').filter({ hasText: 'Admin' }).click();
  }


}
