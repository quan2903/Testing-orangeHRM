import { Page } from "playwright-core";
import { SkillsPage } from "../skills-page";

export class AddSkillsPage {
    constructor(public page: Page) {}
    async goto() {
        const skillsPage = new SkillsPage(this.page);
        await skillsPage.clickAddButton();
    }
    async fillSkillsName(skillsName: string) {
        await this.page.getByRole('textbox').nth(1).fill(skillsName);
    }
    async fillSkillsDescription(description: string) {
        await this.page.getByRole('textbox').nth(2).fill(description);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }
    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
    async isSkillsNameErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Required' })
            .or(base.filter({ hasText: /Required|Should be less than 120 characters|Already exists/ }));
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }
    async isSkillsDescriptionErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: /Required|Should be less than 400 characters/ });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }
}