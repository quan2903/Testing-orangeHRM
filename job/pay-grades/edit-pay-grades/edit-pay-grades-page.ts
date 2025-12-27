import { Page } from "playwright-core";
import { PayGradesPage } from "../pay-grades-page";
import { expect } from '@playwright/test';

export class EditPayGradesPage {
    constructor(public page: Page) {}

    /**
     * Click the Add button for currency (appears in edit page).
     */

    // Note: navigation to the edit page is performed by actions via PayGradesPage.clickEditButton
    async clickAddCurrencyButton() {
    await this.page.getByRole('button', { name: '' }).first().click();
    await this.page.getByRole('button', { name: ' Add' }).click();

    await this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
    
       
    }
    async clickEditCurrencyButton() {
    await this.page.getByRole('button', { name: '' }).first().click();
  
    }
async clickCurrency() {
    // 1. Click dropdown (GIỮ NGUYÊN locator đang hoạt động)
    const dropdownTrigger = this.page
        .locator('div')
        .filter({ hasText: /^-- Select --$/ })
        .nth(2);

    await dropdownTrigger.waitFor({ state: 'visible', timeout: 5000 });
    await dropdownTrigger.click();

    // 2. ĐỢI OPTION XUẤT HIỆN (quan trọng)
    const options = this.page.locator('.oxd-select-option');

  
    await this.page.getByRole('option', { name: 'AOR - Angolan New Kwanza' }).click();
}

    async fillName(name: string) {
        await this.page.getByRole('textbox').nth(1).clear();
        await this.page.getByRole('textbox').nth(1).fill(name);
    }
    /**
     * If `currency` is provided, select that option. Otherwise pick one from the UI dropdown and return its name.
     * Returns the selected currency name when choosing from UI, or the passed currency when provided.
     */
  

    async clickSave() {
        await this.page.getByRole('button', { name: 'Save' }).nth(1).click();
    }

    async clickCancel() {
        await this.page.getByRole('button', { name: 'Cancel' }).click();
    }
    async fillMinimumSalary(minimumSalary: number) {
        await this.page.getByRole('textbox').nth(3).clear();
        await this.page.getByRole('textbox').nth(3).fill(minimumSalary.toString());
    }
    async fillMaximumSalary(maximumSalary: number) {
        await this.page.getByRole('textbox').nth(4).clear();
        await this.page.getByRole('textbox').nth(4).fill(maximumSalary.toString());
    }
    /**
     * Check if currency error message is visible.
     */
    async isCurrencyErrorVisible(): Promise<boolean> {
        // Prefer locating the specific form group that contains the 'Currency' label
        // so we don't accidentally pick up validation messages from other fields (e.g. Name).
        // Use an XPath that finds the label node and then its nearest ancestor div container.
        const currencyContainer = this.page.locator('//label[normalize-space()="Currency"]/ancestor::div[1]');
        const error = currencyContainer.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
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
        const currencyContainer = this.page.locator('//label[normalize-space()="Minimum Salary"]/ancestor::div[1]');
        const error = currencyContainer.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
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
        const currencyContainer = this.page.locator('//label[normalize-space()="Minimum Salary"]/ancestor::div[1]');
        const error = currencyContainer.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }
}