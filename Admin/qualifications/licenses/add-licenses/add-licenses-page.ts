import { Page } from "playwright-core";
import { LicensePage } from "../licenses-page";

export class AddLicensePage {
    constructor(public page: Page) {}

    async goto() {
        const licensesPage = new LicensePage(this.page);
        await licensesPage.clickAddButton();
    }

    async fillLicenseName(name: string) {
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
}
