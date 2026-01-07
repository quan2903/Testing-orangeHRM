import { Page } from "playwright-core";
import { EducationPage } from "../education-page";

export class AddEducationPage {
    constructor(public page: Page) {}

    async goto() {
        const educationPage = new EducationPage(this.page);
        await educationPage.clickAddButton();
    }

    async fillEducationName(name: string) {
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
}
