import { EditLicensePage } from "./edit-licenses-page";
import { LicensePage } from "../licenses-page";
import { Page } from "playwright-core";
import { License } from "../licenses-type";

export class EditLicenseAction {
    constructor(private page: Page) {}

    async goto() {
        const editPage = new EditLicensePage(this.page);
        await editPage.goto();
    }

    async fillAndSaveLicense(license: License) {
        const editPage = new EditLicensePage(this.page);

        if (license.name !== undefined) {

            await editPage.fillLicenseName(license.name);
        }

        await editPage.clickSaveButton();
    }

    async editLicenseWithoutSave(newName: string) {
        const editPage = new EditLicensePage(this.page);
        await editPage.fillLicenseName(newName);
    }

    async isNameErrorVisible(): Promise<boolean> {
        const licensePage = new LicensePage(this.page);
        return licensePage.isLicenseNameErrorVisible();
    }

    async isLicenseExist(name: string): Promise<boolean> {
        const licensePage = new LicensePage(this.page);
        return licensePage.isLicenseExist(name);
    }

    async getFirstLicenseName(): Promise<string> {
        const licensePage = new LicensePage(this.page);
        const name = await licensePage.getFirstLicenseName();
        if (!name) throw new Error('No license found to edit');
        return name;
    }
}
