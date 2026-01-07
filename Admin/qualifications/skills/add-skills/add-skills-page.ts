import { Page } from "playwright-core";
import { SkillsPage } from "../skills-page";

export class AddSkillsPage {
    constructor(public page: Page) {}

    async goto() {
        const skillsPage = new SkillsPage(this.page);
        await skillsPage.clickAddButton();
    }

    async fillSkillName(name: string) {
        const nameInput = this.page.locator('.oxd-input-group input.oxd-input').first();
        await nameInput.waitFor({ state: 'visible', timeout: 10000 });
        await nameInput.clear();
        await nameInput.fill(name);
        await nameInput.blur();
    }

    async fillSkillDescription(description: string) {
        const descInput = this.page.locator('.oxd-textarea').first();
        await descInput.waitFor({ state: 'visible', timeout: 10000 });
        await descInput.clear();
        await descInput.fill(description);
        await descInput.blur();
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
}
