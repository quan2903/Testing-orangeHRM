import { Page, expect } from "@playwright/test";
import { AddLicensePage } from "./add-licenses-page";
import { LicensePage } from "../licenses-page";
import { License } from "../licenses-type";

export class AddLicenseAction {
    constructor(private page: Page) {}

    async goto() {
        const licensePage = new LicensePage(this.page);
        await licensePage.clickAddButton();
    }

    async addLicense(license: License) {
        const addPage = new AddLicensePage(this.page);
        await this.goto();

        if (license.name !== undefined) await addPage.fillLicenseName(license.name);

        await addPage.clickSaveButton();
    }

    async addLicenseWithoutSave(license: License) {
        const addLicense = new AddLicensePage(this.page);
        await this.goto();

        if (license.name !== undefined) await addLicense.fillLicenseName(license.name);
    }

    async cancelAddLicense() {
        const addPage = new AddLicensePage(this.page);
        await addPage.clickCancelButton();
    }


    async addAndVerifyLicense(license: License) {
        const addPage = new AddLicensePage(this.page);
        await this.addLicenseWithoutSave(license);
        await addPage.clickSaveButton();

        return await addPage.isLicenseNameErrorVisible();
    }


    async isNameErrorVisible() {
        const page = new AddLicensePage(this.page);
        return await page.isLicenseNameErrorVisible();
    }

    async copyLicense() {
        const licensePage = new AddLicensePage(this.page);
        return await licensePage.copyLicenseNameFromClipboard();
    }
}
