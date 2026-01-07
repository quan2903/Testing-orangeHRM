import { Page } from "playwright-core";

export class SkillsPage {
    constructor(public page: Page) {}

    async clickAddButton() {
        try {
            await this.page.getByRole('button', { name: 'Add' }).click();
        } catch {}
    }

    async clickEditButton(name?: string) {
        const skill = this.page.getByRole('row', { name });
        await skill.first().waitFor({ state: 'visible', timeout: 10000 });
        await skill.getByRole('button').nth(1).click();
    }

    async clickDeleteButton(name: string) {
        const skill = this.page.locator(`.oxd-table-card >> text=${name}`);
        await skill.first().waitFor({ state: 'visible', timeout: 10000 });
        await skill.locator('button:has(i.icon-trash)').click();
    }

    async getFirstSkillName(): Promise<string | null> {
        try {
            const firstRow = this.page.locator('.oxd-table-card').first();
            await firstRow.waitFor({ state: 'visible', timeout: 5000 });

            const text = await firstRow.innerText();
            return text.split('\n')[0]?.trim() ?? null;
        } catch {
            return null;
        }
    }

    async getThirdSkillName(): Promise<string | null> {
        try {
            const row = this.page.locator('.oxd-table-card').nth(2);
            await row.waitFor({ state: 'visible', timeout: 10000 });

            const text = await row.innerText();
            return text.split('\n')[0]?.trim() ?? null;
        } catch {
            return null;
        }
    }

    async isSkillNameErrorVisible(): Promise<boolean> {
        const error = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        ).filter({
            hasText: /Required|Should not exceed 50 characters|Already exists/
        });

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async isSkillExist(name?: string): Promise<boolean> {
        if (!name) return false;

        const trimmedName = name.trim();

        try {
            const rows = this.page.locator('.oxd-table-card');
            await rows.first().waitFor({ state: 'visible', timeout: 10000 });

            const count = await rows.count();
            for (let i = 0; i < count; i++) {
                const text = (await rows.nth(i).innerText()).split('\n')[0].trim();
                if (text === trimmedName) {
                    return true;
                }
            }
            return false;
        } catch {
            return false;
        }
    }
}
