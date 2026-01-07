import { Page } from "playwright-core";
import { SkillsPage } from "../skills-page";

export class EditSkillsPage {
    constructor(public page: Page) {}

    async goto() {
        const skillsPage = new SkillsPage(this.page);
        const name = await skillsPage.getFirstSkillName();
        await skillsPage.clickEditButton(name!);
    }

    async fillSkillName(name: string) {
        const nameInput = this.page.locator('.oxd-input-group input.oxd-input').first();
        await nameInput.waitFor({ state: 'visible', timeout: 10000 });
        await nameInput.clear();
        await this.page.waitForTimeout(1000);
        await nameInput.fill(name);

    }

    async fillSkillDescription(description: string) {
        const descInput = this.page.locator('.oxd-textarea').first();
        await descInput.waitFor({ state: 'visible', timeout: 10000 });
        await descInput.clear();
        await this.page.waitForTimeout(1000);
        await descInput.fill(description);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async isSkillsNameErrorVisible(): Promise<boolean> {
        const error = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        ).filter({
            hasText: /Required|Should not exceed 120 characters|Already exists/
        });

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async isSkillsDescriptionErrorVisible(): Promise<boolean> {
        const error = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        ).filter({
            hasText: /Required|Should not exceed 400 characters/
        });

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
    
}
