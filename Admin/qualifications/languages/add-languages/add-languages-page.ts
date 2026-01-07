import { Page } from "playwright-core";
import { LanguagePage } from "../languages-page";

export class AddLanguagePage {
    constructor(public page: Page) {}

    async goto() {
        const languagePage = new LanguagePage(this.page);
        await languagePage.clickAddButton();
    }

    async fillLanguageName(name: string) {
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
}
