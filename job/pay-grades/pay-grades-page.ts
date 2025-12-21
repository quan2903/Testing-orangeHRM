import { Page } from "playwright-core";

export class PayGradesPage {
    constructor(public page: Page) {}

    async clickAddButton() {
        const addButtons = this.page.getByRole('button', { name: 'Add' });
        const count = await addButtons.count();
        if (count === 0) {
            throw new Error('No Add buttons found on Pay Grades page');
        }
        await addButtons.first().click();
    }
    
    async isPayGradeExist(name: string): Promise<boolean> {
        const payGrade = this.page.locator('.oxd-table-card', {
            hasText: name
        });

        try {
            await payGrade.first().waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch {
            return false;
        }
    }

    async clickEditButton(name: string) {
        const payGrade = this.page.locator(`.oxd-table-card >> text=${name}`);
        await payGrade.first().waitFor({ state: 'visible', timeout: 10000 });
        await payGrade.locator('button:has(i.icon-pencil)').click();
    }

    async clickDeleteButton(name: string) {
        const payGrade = this.page.locator(`.oxd-table-card >> text=${name}`);
        await payGrade.first().waitFor({ state: 'visible', timeout: 10000 });
        await payGrade.locator('button:has(i.icon-trash)').click();
    }

    /**
     * Check if name error message is visible.
     */
    async isNameErrorVisible(): Promise<boolean> {
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required|Should be less than 50 characters/ });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}