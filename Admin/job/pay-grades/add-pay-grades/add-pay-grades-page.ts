import { Page } from "playwright-core";
import { PayGradesPage } from "../pay-grades-page";

// filepath: c:\Users\ADMIN\Documents\Đồ án tốt nghiệp\Testing-orangeHRM\job\pay-grades\add-pay-grades\add-pay-grades-page.ts

export class AddPayGradesPage {
    constructor(public page: Page) {}

    async goto() {
        const addPayGradesPage = new PayGradesPage(this.page);
        await addPayGradesPage.clickAddButton();
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

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async clickCancelButton() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }

    async isNameErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );

        const error = base
            .filter({ hasText: 'Required' })
            .or(base.filter({ hasText: 'Should be less than 50 characters' }));

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }



    async isPayGradeExist(name: string): Promise<boolean> {
        try {
            const el = this.page.locator(`text="${name}"`);
            await el.first().waitFor({ state: 'visible', timeout: 3000 });
            return await el.count() > 0;
        } catch (e) {
            return false;
        }
    }

    async fillPayGradeDetails(
        name: string,
        description: string,
        note: string,
        file: { name: string; mimeType: string; buffer: Buffer } | null
    ) {
        await this.fillName(name);
        await this.page.waitForTimeout(500);
        await this.clickSaveButton();
    }
}