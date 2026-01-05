import { Page, Locator } from "@playwright/test";
import { SalaryPage } from "../Salary-Page";

export class AddSalaryPage {
    constructor(private page: Page) {}

    async goto() {
        const salaryPage = new SalaryPage(this.page);
        await salaryPage.goto();
        await salaryPage.clickAddSalaryComponent();
    }

    async fillSalaryComponent(name?: string) {
        if (!name) return;
        await this.page.getByRole('textbox').nth(1).fill(name);
    }

    private async selectOptionByText(dropdown: Locator, text?: string) {
        if (!text) return;

        await dropdown.waitFor({ state: 'visible', timeout: 5000 });
        await dropdown.scrollIntoViewIfNeeded();
        await dropdown.click();

        const option = this.page
            .locator('.oxd-select-option')
            .filter({ hasText: text })
            .first();

        await option.waitFor({ state: 'visible', timeout: 5000 });
        await option.click();
    }


    private async selectRandomOption(dropdown: Locator) {
        await dropdown.scrollIntoViewIfNeeded();
        await dropdown.waitFor({ state: 'visible', timeout: 5000 });
        await dropdown.click({ force: true });

        const options = this.page.locator('.oxd-select-option');
        await options.first().waitFor({ state: 'visible', timeout: 5000 });

        const count = await options.count();
        if (count === 0) {
            throw new Error('No options found in dropdown');
        }

        const randomIndex = Math.floor(Math.random() * count);
        await options.nth(randomIndex).click();
    }


    async selectPayGrade(label?: string) {
        const dropdown = this.page
            .locator('.oxd-input-group')
            .nth(1)
            .locator('.oxd-select-text');

        await this.selectOptionByText(dropdown, label);
    }

    async selectPayFrequency(label?: string) {
        const dropdown = this.page
            .locator('.oxd-input-group')
            .nth(2)
            .locator('.oxd-select-text');

        await this.selectOptionByText(dropdown, label);
    }

    async selectCurrency(label?: string) {
        await this.page.waitForTimeout(300); // cho form re-render

        const dropdown = this.page
            .locator('.oxd-input-group')
            .filter({ hasText: 'Currency' })
            .locator('.oxd-select-text');

        await this.selectOptionByText(dropdown, label);
    }

    async selectRandomPayGrade() {
        await this.selectRandomOption(
            this.page.locator('.oxd-input-group').nth(1).locator('.oxd-select-text')
        );
    }

    async selectRandomPayFrequency() {
        await this.selectRandomOption(
            this.page.locator('.oxd-input-group').nth(2).locator('.oxd-select-text')
        );
    }

    async selectRandomCurrency() {
        await this.selectRandomOption(
            this.page.locator('.oxd-input-group').nth(3).locator('.oxd-select-text')
        );
    }

    async fillAmount(amount?: string | number) {
        if (amount === undefined || amount === null) return;

        const input = this.page.getByRole('textbox').nth(2);
        await input.waitFor({ state: 'visible', timeout: 3000 });
        await input.fill(String(amount));
    }

    async fillComments(comments?: string) {
        if (!comments) return;
        await this.page.locator('textarea').fill(comments);
    }

    async clickSaveButton() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async isSalaryComponentErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').nth(0);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isCurrencyErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').nth(3);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isAmountErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').nth(4);
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    async isCommentsErrorVisible(): Promise<boolean> {
        const field = this.page.locator('.oxd-input-group').last();
        const error = field.locator('.oxd-input-field-error-message');

        try {
            await error.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }
}
