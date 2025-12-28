import { Page } from "playwright-core";

export class SkillsPage {
    constructor(public page: Page) {}

    async clickAddButton() {

        try {
            await this.page.waitForLoadState('networkidle', { timeout: 2000 });
            await this.page.getByRole('button', { name: 'Add' }).click();
        } catch {}
    }
    
    async isSkillExist(expectedName: string): Promise<boolean> {
        const nameInput = this.page
            .locator('div.oxd-input-group')
            .filter({ has: this.page.locator('label', { hasText: 'Name' }) })
            .locator('input.oxd-input');

        try {
            await nameInput.waitFor({ state: 'visible', timeout: 5000 });
            const value = (await nameInput.inputValue()).trim();
            return value === expectedName;
        } catch {
            return false;
        }
    }

    async clickEditButton(name: string) {
        const skills = this.page.locator(`.oxd-table-card >> text=${name}`);
        await skills.first().waitFor({ state: 'visible', timeout: 10000 });
        await skills.locator('button:has(i.icon-pencil)').click();
    }
    async clickDeleteButton(name: string) {
        const skills = this.page.locator(`.oxd-table-card >> text=${name}`);
        await skills.first().waitFor({ state: 'visible', timeout: 10000 });
        await skills.locator('button:has(i.icon-trash)').click();
    }
}