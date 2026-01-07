import { EducationPage } from "../education-page";
import { Page } from "playwright-core";

export class EditEducationPage {
    constructor(public page: Page) {}

    async goto() {
        const educationPage = new EducationPage(this.page);

        const name = await educationPage.getFirstEducationName();
        if (!name) {
            throw new Error('No education found to edit');
        }

        await educationPage.clickEditButton(name);
    }

    async fillEducationName(name: string) {
        const nameInput = this.page.locator('form').getByRole('textbox');
        await nameInput.clear();
        await nameInput.fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
}
