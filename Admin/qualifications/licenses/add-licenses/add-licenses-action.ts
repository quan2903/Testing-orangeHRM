import { Page } from "@playwright/test";
import { AddLicensePage } from "./add-licenses-page";
import { LicensePage } from "../licenses-page";
import { License } from "../licenses-type";

export class AddLicenseAction {
    constructor(private page: Page) {}

    async goto() {
        const addPage = new AddLicensePage(this.page);
        await addPage.goto();
    }

    async addLicense(license: License) {
        const addPage = new AddLicensePage(this.page);
        await this.goto();

        if (license.name !== undefined) {
            await addPage.fillLicenseName(license.name);
        }

        await addPage.clickSaveButton();
    }

    async isLicenseExist(name: string): Promise<boolean> {
        const licensePage = new LicensePage(this.page);
        return await licensePage.isLicenseExist(name);
    }

    async isNameErrorVisible(): Promise<boolean> {
        const licensePage = new LicensePage(this.page);
        return await licensePage.isLicenseNameErrorVisible();
    }

    async getFirstLicenseName(): Promise<string> {
        const licensePage = new LicensePage(this.page);
        const name = await licensePage.getFirstLicenseName();

        if (!name) {
            throw new Error('No license found');
        }

        return name;
    }
}
