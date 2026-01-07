import { Page, Locator } from 'playwright-core';
import { EmploymentListPage } from '../Employment-List-Page';

export class PersonalDetailsPage {
    constructor(private page: Page) {}

    async goto(): Promise<void> {
        const employmentListPage = new EmploymentListPage(this.page);
        await employmentListPage.clickEditFirstRow();
    }

    private async fillIfProvided(locator: Locator, value?: string): Promise<void> {
        if (!value) return;
        await this.page.waitForTimeout(500);
        await locator.clear();
        await this.page.waitForTimeout(500);
        await locator.fill(value);
    }

    private get firstNameInput() {
        return this.page.getByRole('textbox', { name: 'First Name' });
    }

    private get middleNameInput() {
        return this.page.getByRole('textbox', { name: 'Middle Name' });
    }

    private get lastNameInput() {
        return this.page.getByRole('textbox', { name: 'Last Name' });
    }

    private employeeIdGroup() {
        return this.page.locator('div').filter({ hasText: /^Employee IdOther Id$/ });
    }

    private licenseGroup() {
        return this.page.locator('div').filter({
            hasText: /^Driver's License NumberLicense Expiry Date$/,
        });
    }

    private dobGroup() {
        return this.page.locator('div').filter({
            hasText: /^Date of BirthGenderMaleFemale$/,
        });
    }

    async fillFirstName(value?: string): Promise<void> {
        
        await this.fillIfProvided(this.firstNameInput, value);
    }

    async fillMiddleName(value?: string): Promise<void> {
        await this.fillIfProvided(this.middleNameInput, value);
    }

    async fillLastName(value?: string): Promise<void> {
        await this.fillIfProvided(this.lastNameInput, value);
    }

    async fillEmployeeId(value?: string): Promise<void> {
        if (!value) return;
        await this.employeeIdGroup().getByRole('textbox').first().fill(value);
    }

    async fillOtherId(value?: string): Promise<void> {
        if (!value) return;
        await this.employeeIdGroup().getByRole('textbox').nth(1).fill(value);
    }

    async fillLicenseNumber(value?: string): Promise<void> {
        if (!value) return;
        await this.licenseGroup().getByRole('textbox').first().fill(value);
    }

    async fillLicenseExpiryDate(value?: string): Promise<void> {
        if (!value) return;
        await this.licenseGroup().getByPlaceholder('dd-mm-yyyy').fill(value);
    }

    async fillDateOfBirth(value?: string): Promise<void> {
        if (!value) return;
        await this.dobGroup().getByPlaceholder('dd-mm-yyyy').fill(value);
    }

    async chooseRandomNationality(keyword?: string): Promise<string | undefined> {
        if (!keyword) return;

        const dropdown = this.page.locator('.oxd-select-text').first();
        await dropdown.click();
        await this.page.keyboard.type(keyword);

        const options = this.page.locator('.oxd-select-dropdown .oxd-select-option');
        await options.first().waitFor({ state: 'visible' });

        if ((await options.count()) < 3) {
            throw new Error('Nationality options less than 3');
        }

        const option = options.nth(2);
        const text = await option.innerText();
        await option.click();

        return text.trim();
    }

    async saveChanges(): Promise<void> {
        await this.page
            .locator('form')
            .filter({ hasText: 'Employee Full NameEmployee' })
            .getByRole('button')
            .click();
    }

    private async isErrorVisible(pattern: string | RegExp): Promise<boolean> {
        const error = this.page
            .locator('span.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: pattern });

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    async isFirstNameErrorVisible() {
        return this.isErrorVisible('Should not exceed 30 characters');
    }

    async isMiddleNameErrorVisible() {
        return this.isErrorVisible('Should not exceed 30 characters');
    }

    async isLastNameErrorVisible() {
        return this.isErrorVisible('Should not exceed 30 characters');
    }

    async isEmployeeIdErrorVisible() {
        return this.isErrorVisible('Should not exceed 10 characters');
    }

    async isOtherIdErrorVisible() {
        return this.isErrorVisible('Should not exceed 30 characters');
    }

    async isLicenseNumberErrorVisible() {
        return this.isErrorVisible('Should not exceed 30 characters');
    }

    async isLicenseExpiryDateErrorVisible() {
        return this.isErrorVisible(
            /Should be a valid date in dd-mm-yyyy format|Should not too far/
        );
    }

    async isDateOfBirthErrorVisible() {
        return this.isErrorVisible(
            /Should be a valid date in dd-mm-yyyy format|Should not too far/
        );
    }
}
