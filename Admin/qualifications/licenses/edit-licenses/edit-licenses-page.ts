import { LicensePage } from "../licenses-page";
import { Page } from "playwright-core";

export class EditLicensePage {
    constructor(public page: Page) {}

    async goto() {
        const licensePage = new LicensePage(this.page);
        const name = await licensePage.getFirstLicenseName();

        if (!name) {
            throw new Error('No license found to edit');
        }

        await licensePage.clickEditButton(name);
    }

    async fillLicenseName(name: string) {
        const nameInput = this.page.locator('form').getByRole('textbox');
        await this.page.waitForTimeout(1000)
        await nameInput.clear();
        await this.page.waitForTimeout(1000)
        await nameInput.fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
