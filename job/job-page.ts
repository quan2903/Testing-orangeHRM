import { Page } from "playwright-core";
import { AdminPage } from "../AdminPage";

export class JobPage {
  constructor(private page: Page) {}

  async goto() {
    const adminPage = new AdminPage(this.page);
    await adminPage.goto();
    const jobMenu = this.page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: "Job",
    });
    await jobMenu.first().click();
  }

  async navigateToJobTitles() {
    await this.goto();
    await this.page
      .getByRole("menuitem", { name: "Job Titles" })
      .first()
      .click();
  }
}
