import { Page } from "playwright-core";
import { EmploymentListPage } from "../Employment-List-Page";
export class PersonalDetailsPage {

    constructor(private page: Page) {}
    async goto() {
        const employmentListPage = new EmploymentListPage(this.page);
        const employeeName = await employmentListPage.getFirstEmployeeName();
        await employmentListPage.clickEditByEmployeeName(employeeName);
    }

    async fillPersonalDetails(firstName: string, middleName: string, lastName: string, employeeId: string,  otherId: string, licenseNumber: string, licenseExpiryDate: string, nationality: string, maritalStatus: string, dateOfBirth: string, Gender: 'Male' | 'Female')  {
        const firstNameInput = this.page.getByLabel('First Name');
        await firstNameInput.fill(firstName);
        const middleNameInput = this.page.getByLabel('Middle Name');
        await middleNameInput.fill(middleName);
        const lastNameInput = this.page.getByLabel('Last Name');
        await lastNameInput.fill(lastName);
        const employeeIdInput = this.page.getByLabel('Employee Id');
        await employeeIdInput.fill(employeeId);
        const otherIdInput = this.page.getByLabel('Other Id');
        await otherIdInput.fill(otherId);
        const licenseNumberInput = this.page.getByLabel('License Number');
        await licenseNumberInput.fill(licenseNumber);
        const licenseExpiryDateInput = this.page.getByLabel('License Expiry Date');
        await licenseExpiryDateInput.fill(licenseExpiryDate);
    }

    async saveChanges() {
        const saveButton = this.page.getByRole('button', { name: 'Save' });
        await saveButton.click();
    }

    async isFirstNameErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base.filter({ hasText: /Required|Should not exceed 30 characters/ });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }

    async isMiddleNameErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Should not exceed 30 characters' });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }
    async isLastNameErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'   
        );
        const error = base
           .filter({ hasText: '|Should not exceed 30 characters' });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }

    async isEmployeeIdErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Should not exceed 10 characters' });
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }

    async isOtherIdErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Required' })
            .or(base.filter({ hasText: /Required|Should not exceed 30 characters/ }));
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }

    async isLicenseNumberErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Required' })
            .or(base.filter({ hasText: /Required|Should not exceed 30 characters/ }));   

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }   
        catch {
            return false;
        }
    }

    async isLicenseExpiryDateErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Required' })
            .or(base.filter({ hasText: /Should be a valid date in dd-mm-yyyy format|Should not too far in the past|Should not too far in the future/ }));
        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }

    async isDateOfBirthErrorVisible(): Promise<boolean> {
        const base = this.page.locator(
            'span.oxd-text.oxd-text--span.oxd-input-field-error-message'
        );
        const error = base
            .filter({ hasText: 'Required' })
            .or(base.filter({ hasText: /Should be a valid date in dd-mm-yyyy format|Should not too far in the past|Should not too far in the future/ }));

        try {
            await error.first().waitFor({ state: 'visible', timeout: 5000 });
            return true;
        }
        catch {
            return false;
        }
    }

    
}