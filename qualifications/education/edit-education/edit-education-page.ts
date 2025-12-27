import { EducationPage } from "../education-page";
import { Page } from "playwright-core";
export class EditEducationPage {
    constructor(public page: Page) {}

    async goto(name: string) {
        const educationPage = new EducationPage(this.page);
        await educationPage.clickEditButton(name);
    }

    async fillEducationName(name: string) {
        const nameInput = this.page
            .locator('div.oxd-input-group')
            .filter({ has: this.page.locator('label', { hasText: 'Name' }) })
            .locator('input.oxd-input');
        await nameInput.clear();
        await nameInput.fill(name);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
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
