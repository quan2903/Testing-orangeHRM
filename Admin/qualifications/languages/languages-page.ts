import { Page } from "playwright-core";

export class LanguagePage {
  constructor(public page: Page) {}

  async clickAddButton() {
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 2000 });
      await this.page.getByRole('button', { name: 'Add' }).click();
    } catch {}
  }

  async clickEditButton(name?: string) {
    const row = await this.findRowByLanguageName(name);
    if (!row) {
      throw new Error(`Language "${name}" not found to edit`);
    }
    await row.locator('button:has(i.icon-pencil)').click();
  }

  async clickDeleteButton(name: string) {
    const row = await this.findRowByLanguageName(name);
    if (!row) {
      throw new Error(`Language "${name}" not found to delete`);
    }
    await row.locator('button:has(i.icon-trash)').click();
  }

  async getFirstLanguageName(): Promise<string | null> {
    try {
      const firstRow = this.page.locator('.oxd-table-card').first();
      await firstRow.waitFor({ state: 'visible', timeout: 5000 });

      const name = await firstRow
        .locator('.oxd-table-cell')
        .nth(1)
        .innerText();

      return name.trim();
    } catch {
      return null;
    }
  }

  async getThirdLanguageName(): Promise<string | null> {
    try {
      const thirdRow = this.page.locator('.oxd-table-card').nth(2);
      await thirdRow.waitFor({ state: 'visible', timeout: 10000 });

      const name = await thirdRow
        .locator('.oxd-table-cell')
        .nth(1)
        .innerText();

      return name.trim();
    } catch {
      return null;
    }
  }

  async isLanguageNameErrorVisible(): Promise<boolean> {
    const error = this.page
      .locator('span.oxd-input-field-error-message')
      .filter({
        hasText: /Required|Should not exceed 120 characters|Already exists/
      });

    try {
      await error.first().waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  private async findRowByLanguageName(name?: string) {
    if (!name) return null;

    const expectedName = name.trim();

    while (true) {
      const rows = this.page.locator('.oxd-table-card');
      const count = await rows.count();

      for (let i = 0; i < count; i++) {
        const row = rows.nth(i);
        const languageName = (
          await row.locator('.oxd-table-cell').nth(1).innerText()
        ).trim();

        if (languageName === expectedName) {
          return row;
        }
      }

      const nextBtn = this.page
        .locator('.oxd-pagination-page-item--previous-next')
        .nth(1);

      if (!(await nextBtn.isVisible())) break;

      await nextBtn.click();
      await this.page.waitForTimeout(300);
    }

    return null;
  }

  async isLanguageExist(name?: string): Promise<boolean> {
    if (!name) return false;
    const row = await this.findRowByLanguageName(name);
    return row !== null;
  }
}
