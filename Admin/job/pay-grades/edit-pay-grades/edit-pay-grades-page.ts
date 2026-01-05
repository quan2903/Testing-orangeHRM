import { Page } from "playwright-core";

export class EditPayGradesPage {
    constructor(public page: Page) {}

    async fillName(name: string) {
        const input = this.page.getByRole('textbox').nth(1);
        await input.clear();
        await input.fill(name);
    }

    async fillCurrency(currency: string) {
        if (!currency) return;
        const dropdown = this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2);
        await dropdown.click();
        await this.page.getByRole('option', { name: currency }).click();
    }

    async fillMinimumSalary(minimumSalary: number) {
        const input = this.page.getByRole('textbox').nth(3);
        await input.clear();
        await input.fill(minimumSalary.toString());
    }

    async fillMaximumSalary(maximumSalary: number) {
        const input = this.page.getByRole('textbox').nth(4);
        await input.clear();
        await input.fill(maximumSalary.toString());
    }

    async clickSave() {
        await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
    }

    async clickCancel() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async isCurrencyErrorVisible(): Promise<boolean> {
        const container = this.page.locator('//label[normalize-space()="Currency"]/ancestor::div[1]');
        const error = container.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required/ });
        try { await error.first().waitFor({ state: 'visible', timeout: 5000 }); return true; } 
        catch { return false; }
    }

    async isMinimumSalaryErrorVisible(): Promise<boolean> {
        const container = this.page.locator('//label[normalize-space()="Minimum Salary"]/ancestor::div[1]');
        const error = container.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: /Required|Should be a valid number|Minimum Salary must be less than Maximum Salary/ });
        try { await error.first().waitFor({ state: 'visible', timeout: 5000 }); return true; } 
        catch { return false; }
    }

    async isMaximumSalaryErrorVisible(): Promise<boolean> {
        const container = this.page.locator('//label[normalize-space()="Maximum Salary"]/ancestor::div[1]');
        const error = container.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message');
        try { await error.first().waitFor({ state: 'visible', timeout: 5000 }); return true; } 
        catch { return false; }
    }
}
