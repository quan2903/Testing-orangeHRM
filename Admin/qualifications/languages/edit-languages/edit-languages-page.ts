import { LanguagePage } from "../languages-page";
import { Page } from "playwright-core";

export class EditLanguagePage {
    constructor(public page: Page) {}

    async goto() {
        const languagePage = new LanguagePage(this.page);
        const name = await languagePage.getFirstLanguageName();

        if (!name) {
            throw new Error('No language found to edit');
        }

        await languagePage.clickEditButton(name);
    }

    async fillLanguageName(name: string) {
        const nameInput = this.page.locator('form').getByRole('textbox');
        await this.page.waitForTimeout(1000);
        await nameInput.clear();
        await this.page.waitForTimeout(1000);
        await nameInput.fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
