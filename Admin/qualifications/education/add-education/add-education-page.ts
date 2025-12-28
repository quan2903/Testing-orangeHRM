import { Page } from "playwright-core";
import { EducationPage } from "../education-page";

export class AddEducationPage {
    constructor(public page: Page) {}
    async goto() {
        const educationPage = new EducationPage(this.page);
        await educationPage.clickAddButton();
    }
    async fillEducationName(educationName: string) {
        await this.page.getByRole('textbox').nth(1).fill(educationName);
    }
    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
    async isEducationNameErrorVisible(): Promise<boolean> {
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

}