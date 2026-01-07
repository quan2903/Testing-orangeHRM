import { Page } from "playwright-core";
import { PayGradesPage } from "../pay-grades-page";

export class AddPayGradesPage {
    constructor(public page: Page) {}

    async goto() {
        const payGradesPage = new PayGradesPage(this.page);
        await payGradesPage.clickAddButton();
    }

    async fillName(name: string) {
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    async fillCurrency(currency: string) {
        await this.page.getByRole('combobox').click();
        await this.page.getByRole('option', { name: currency }).click();
    }

    async fillMinimumSalary(minimumSalary: number) {
        await this.page.getByPlaceholder('Type here').nth(0).fill(minimumSalary.toString());
    }

    async fillMaximumSalary(maximumSalary: number) {
        await this.page.getByPlaceholder('Type here').nth(1).fill(maximumSalary.toString());
    }

    // Lưu tên bậc lương → chuyển sang màn hình Add Currency
    async saveNameOnly() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    // Cancel ở màn hình Add Currency
    async cancelCurrency() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    // Error helpers
    async isErrorVisible(field: 'name' | 'salary'): Promise<boolean> {
        const base = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message');
        let error;
        switch (field) {
            case 'name':
                error = base.filter({ hasText: /Required|Should not exceed 50 characters|Already exists/ });
                break;
            case 'salary':
                error = base.filter({ hasText: /Invalid|Minimum salary must not exceed maximum/ });
                break;
            default:
                return false;
        }
        try {
            await error.first().waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isNameErrorVisible() {
        return this.isErrorVisible('name');
    }

    async isSalaryErrorVisible() {
        return this.isErrorVisible('salary');
    }

    async isGlobalErrorNotificationVisible(pattern: string | RegExp = /Error|Invalid|Failed|Unable|Not allowed|Already exists/): Promise<boolean> {
        const toast = this.page.locator('.oxd-toast-content, .oxd-alert-content, .oxd-toast, .oxd-alert').filter({ hasText: pattern });
        try {
            await toast.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async copyFirstPayGrade(): Promise<string | null> {
        try {
            const firstRow = this.page.locator('.oxd-table-card').first();
            await firstRow.scrollIntoViewIfNeeded();
            const text = await firstRow.innerText();
            const lines = text.split('\n');
            return lines[0] ?? null;
        } catch {
            return null;
        }
    }

    // Full fill và Save + Add Currency
    async fillPayGradeDetails(name: string, currency?: string, minimumSalary?: number, maximumSalary?: number) {
        if (name) await this.fillName(name);
        if (currency) await this.fillCurrency(currency);
        if (minimumSalary !== undefined) await this.fillMinimumSalary(minimumSalary);
        if (maximumSalary !== undefined) await this.fillMaximumSalary(maximumSalary);
        await this.clickSaveButton();
    }
}
