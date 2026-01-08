import { Page, expect } from "@playwright/test";
import { EditNationalitiesPage } from "./edit-nationalities-page";
import { NationalitiesPage} from"../nationalities-page"
export class EditNationalitiesAction {
  private editPage: EditNationalitiesPage;

  constructor(private page: Page) {
    this.editPage = new EditNationalitiesPage(page);
  }

  async goto() {
    await this.editPage.goto();
  }

  async editNationality(name?: string) {
    await this.editPage.fillAndSave(name);
  }

  async editAndVerify(name?: string) {
  if (!name) {
    throw new Error("Nationality name is required for verification");
  }

  await this.editNationality(name! );

  const listPage = new NationalitiesPage(this.page);

  await expect.poll(
    () => listPage.isNationalityExist(name),
    { timeout: 7000 }
  ).toBe(true);

  return true;
  }

  async isNameErrorVisible(): Promise<boolean> {
    return this.editPage.isNationalityNameErrorVisible();
  }

  async isGlobalErrorVisible(
    pattern?: string | RegExp
  ): Promise<boolean> {
    return this.editPage.isGlobalErrorNotificationVisible(pattern);
  }
}
