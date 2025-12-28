import { Page } from "playwright-core";
import { AdminPage } from "../AdminPage";

export class QualificationsPage {
  constructor(private page: Page) {}

  async goto() {
    const adminPage = new AdminPage(this.page);
    await adminPage.goto();
    const QualificationsMenu = this.page.locator(".oxd-topbar-body-nav-tab-item", {
      hasText: "Qualifications",
    });
    await QualificationsMenu.first().click();
  }

  async navigateToSkills() {
    await this.goto();
    await this.page
      .getByRole("menuitem", { name: "Skills" })
      .first()
      .click();
  }
  async navigateToEducation() {
    await this.goto();
    await this.page
      .getByRole("menuitem", { name: "Education" })
      .first()
      .click();
  }
  async navigateToLicenses() {
    await this.goto();
    await this.page
      .getByRole("menuitem", { name: "Licenses" })
      .first()
      .click();
  }
  async navigateToLanguages() {
    await this.goto();
    await this.page
      .getByRole("menuitem", { name: "Languages" })
      .first()
      .click();
  }
  async navigateToMemberships() {
    await this.goto();
    await this.page
      .getByRole("menuitem", { name: "Memberships" })
      .first()
      .click();
  }
}
