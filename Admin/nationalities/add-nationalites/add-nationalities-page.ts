import { Page } from "playwright-core";
import { NationalitiesPage } from "../nationalities-page";

export class AddNationalitiesPage {
  constructor(public page: Page) {}

  async goto() {
    const listPage = new NationalitiesPage(this.page);
    await listPage.clickAddButton();
  }

  async fillName(name: string) {
    await this.page.getByRole('textbox').nth(1).fill(name);
  }

  async clickSaveButton() {
    await Promise.all([
      this.page.waitForURL('**/admin/nationality'),
      this.page.getByRole('button', { name: 'Save' }).click(),
    ]);
  }

  async clickCancelButton() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async isNameErrorVisible(): Promise<boolean> {
    const error = this.page
      .locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
      .filter({ hasText: /Required|Already exists|Should not exceed 100 characters/ });

    try {
      await error.first().waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async fillNationalityDetails(name: string) {
    await this.fillName(name);
    await this.page.waitForTimeout(200);
    await this.clickSaveButton();
  }
}
