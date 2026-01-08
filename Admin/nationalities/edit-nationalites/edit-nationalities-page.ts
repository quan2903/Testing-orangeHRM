import { Page } from "@playwright/test";
import { NationalitiesPage } from "../nationalities-page";

export class EditNationalitiesPage {
  private _lastNationality?: string;

  constructor(public page: Page) {}

  async goto() {
    const listPage = new NationalitiesPage(this.page);
    await listPage.goto();

    const firstRow = this.page.locator(".oxd-table-card").first();
    await firstRow.waitFor({ state: "visible", timeout: 10000 });
    await firstRow.getByRole("button").nth(1).click();

    await this.page.getByRole("textbox").first().waitFor({
      state: "visible",
      timeout: 10000,
    });
  }

  async fillNationalityName(name?: string) {
    if (name === undefined) return;

    const input = this.page.locator('form').getByRole('textbox');
    await input.click();
    await this.page.waitForTimeout(500);
    await input.clear();
    await this.page.waitForTimeout(100);
    await input.fill(name);
    this._lastNationality = name;
  }

  async save() {

    await Promise.all([
      this.page.waitForURL('**/admin/nationality'),
      this.page.getByRole('button', { name: 'Save' }).click(),
    ]);
  
  }

  async fillAndSave(name?: string) {
    await this.fillNationalityName(name);
    await this.save();
  }

  async isEditSuccessful(): Promise<boolean> {
    if (!this._lastNationality) return false;

    const expected = this._lastNationality.trim();
    const listPage = new NationalitiesPage(this.page);

    return listPage.isNationalityExist(expected);
  }

  private async isFieldErrorVisible(
    pattern: string | RegExp
  ): Promise<boolean> {
    const error = this.page
      .locator("span.oxd-input-field-error-message")
      .filter({ hasText: pattern });

    try {
      await error.first().waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isNationalityNameErrorVisible(): Promise<boolean> {
    return this.isFieldErrorVisible(
      /Required|Already exists|Should not exceed|Invalid|Only spaces/
    );
  }

  async isGlobalErrorNotificationVisible(
    pattern: string | RegExp = /Error|Invalid|Failed|Unable|Not allowed|Already exists/
  ): Promise<boolean> {
    const toast = this.page
      .locator(".oxd-toast-content, .oxd-alert-content, .oxd-toast, .oxd-alert")
      .filter({ hasText: pattern });

    try {
      await toast.first().waitFor({ state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
