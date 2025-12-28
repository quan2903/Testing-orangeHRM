import { Page } from "playwright-core";
import { LicensePage } from "../licenses-page";

export class AddLicensePage {
    constructor(public page: Page) {}
    async goto() {
        const licensePage = new LicensePage(this.page);
        await licensePage.clickAddButton();
    }
    async fillLicenseName(licenseName: string) {
        await this.page.getByRole('textbox').nth(1).fill(licenseName);
    }
    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
    async isLicenseNameErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Required' })
            .or(base.filter({ hasText: /Required|Should be less than 100 characters|Already exists/ }));
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }

    async copyLicenseNameFromClipboard(): Promise<string> {
        return await this.page.evaluate(() => navigator.clipboard.readText());
    }

}