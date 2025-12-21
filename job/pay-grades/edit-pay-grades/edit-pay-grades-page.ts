import { Page } from "playwright-core";

export class EditPayGradesPage {
    constructor(public page: Page) {}

    /**
     * Click the Add button for currency (appears in edit page).
     */
    async clickAddCurrencyButton() {
        const addButtons = this.page.getByRole('button', { name: 'Add' });
        const count = await addButtons.count();
        if (count < 2) {
            throw new Error('Currency Add button not found on edit page');
        }
        await addButtons.nth(1).click();
    }
    async fillName(name: string) {
        await this.page.getByRole('textbox').nth(1).clear();
        await this.page.getByRole('textbox').nth(1).fill(name);
    }
    async selectCurrency(currency: string) {
        await this.clickAddCurrencyButton();
        await this.page.getByRole('combobox').click();
        await this.page.getByRole('option', { name: currency }).click();
    }
    async fillMinimumSalary(minimumSalary: number) {
        await this.page.getByPlaceholder('Type here').nth(0).clear();
        await this.page.getByPlaceholder('Type here').nth(0).fill(minimumSalary.toString());
    }
    async fillMaximumSalary(maximumSalary: number) {
        await this.page.getByPlaceholder('Type here').nth(1).clear();
        await this.page.getByPlaceholder('Type here').nth(1).fill(maximumSalary.toString());
    }
    /**
     * Check if currency error message is visible.
     */
    async isCurrencyErrorVisible(): Promise<boolean> {
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required/ });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if minimum salary error message is visible.
     */
    async isMinimumSalaryErrorVisible(): Promise<boolean> {
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required|Should be a valid number|Minimum Salary must be less than Maximum Salary/ });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if maximum salary error message is visible.
     */
    async isMaximumSalaryErrorVisible(): Promise<boolean> {
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required|Should be a valid number|Maximum Salary must be greater than Minimum Salary/ });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}