import { Page, expect } from "@playwright/test";
import { AddNationalitiesPage } from "./add-nationalities-page";
import { NationalitiesPage } from "../nationalities-page";
import { NationalityType } from "../nationalities-type"


export class AddNationalitiesAction {
  constructor(private page: Page) {}

  async goto() {
    const addPage = new AddNationalitiesPage(this.page);
    await addPage.goto();
  }

  async addNationality(data: NationalityType) {
    const addPage = new AddNationalitiesPage(this.page);
    await addPage.goto();

    if (data.name !== undefined) {
      await addPage.fillName(data.name);
    }

    await addPage.clickSaveButton();
  }

  async addNationalityWithoutSave(data: NationalityType) {
    const addPage = new AddNationalitiesPage(this.page);
    await addPage.goto();

    if (data.name !== undefined) {
      await addPage.fillName(data.name);
    }
  }

  async cancelAddNationality() {
    const addPage = new AddNationalitiesPage(this.page);
    await addPage.clickCancelButton();
  }

  async addAndVerifyNationality(data: NationalityType) {
    if (!data.name) {
      throw new Error("Nationality name is required for verification");
    }

    await this.addNationality(data);

    const listPage = new NationalitiesPage(this.page);

    await expect.poll(
      () => listPage.isNationalityExist(data.name!),
      { timeout: 7000 }
    ).toBe(true);
  }

  async isNameErrorVisible() {
    const addPage = new AddNationalitiesPage(this.page);
    return addPage.isNameErrorVisible();
  }

  async isNationalityExist(name: string): Promise<boolean> {
    const listPage = new NationalitiesPage(this.page);
    return listPage.isNationalityExist(name);
  }
}
