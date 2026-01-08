import { Page } from "@playwright/test";
import { AdminPage } from "../AdminPage";

export class NationalitiesPage {
  constructor(public page: Page) {}

  async goto() {
    const adminPage = new AdminPage(this.page);
    await adminPage.goto();

    const nation = this.page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: "Nationalities",
    });
    await nation.first().click();
  }

  async clickAddButton() {
    await this.page.getByRole("button", { name: "Add" }).click();
  }

  async clickEditButton(name: string) {
    const row = this.page.locator(`.oxd-table-card >> text=${name}`);
    await row.first().waitFor({ state: "visible", timeout: 10000 });
    await row.locator("button:has(i.icon-pencil)").click();
  }

  async clickDeleteButton(name: string) {
    const row = this.page.locator(`.oxd-table-card >> text=${name}`);
    await row.first().waitFor({ state: "visible", timeout: 10000 });
    await row.locator("button:has(i.icon-trash)").click();
  }

  async copyFirstNationality(): Promise<string | null> {
    try {
      const firstRow = this.page.locator(".oxd-table-card").first();
      await firstRow.scrollIntoViewIfNeeded();
      const text = await firstRow.innerText();
      return text.split("\n")[0] ?? null;
    } catch {
      return null;
    }
  }

async isNationalityExist(name: string): Promise<boolean> {
  if (!name) return false;

  const expectedName = name.trim();

  while (true) {
    const rows = this.page.locator('.oxd-table-card');
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
      const row = rows.nth(i);
      const nationalityName = (
        await row.locator('.oxd-table-cell').nth(1).innerText()
      ).trim();

      if (nationalityName === expectedName) {
        return true;
      }
    }

    const nextBtn = this.page
      .locator('.oxd-pagination-page-item--previous-next')
      .nth(1);

    if (!(await nextBtn.isVisible())) return false;

    await nextBtn.click();
    await this.page.waitForTimeout(300);
  }
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
