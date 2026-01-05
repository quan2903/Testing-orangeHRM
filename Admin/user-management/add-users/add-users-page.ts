import {Page    } from "@playwright/test";
import { UserPage } from "../users-page";
export class AddUserPage{
    constructor (private page: Page){
       
    }
    async goto(){
        const adduserpage = new UserPage(this.page)
        await adduserpage.clickAddButton();
    }
    
    async fillUserRole(UserRole: 'Admin' | 'ESS'){
        await this.page.locator('.oxd-input-group')
            .filter({ hasText: 'User Role' })
            .locator('.oxd-select-text')
            .click();
        await this.page.getByRole('option', { name: UserRole }).click();
    }

    async fillStatus(Status: 'Enabled'|'Disabled'){
        await this.page.locator('.oxd-input-group')
            .filter({ hasText: 'Status' })
            .locator('.oxd-select-text')
            .click();
        await this.page.getByRole('option', { name: Status }).click();
    }

    async fillEmployeeName(EmployeeName: string){
        await this.page.locator('.oxd-input-group')
            .filter({ hasText: 'Employee Name' })
            .locator('input')
            .fill(EmployeeName);
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('option').first().click();
    }

    async fillEmployeeNameNotSelect(EmployeeName: string){
        await this.page.locator('.oxd-input-group')
            .filter({ hasText: 'Employee Name' })
            .locator('input')
            .fill(EmployeeName);
    }

    async fillUsername(Username: string){
        await this.page.locator('.oxd-input-group')
            .filter({ hasText: 'Username' })
            .locator('input')
            .fill(Username);
    }
    
    async fillPassword(Password: string){
        await this.page.getByRole('textbox').nth(3).fill(Password);
    }

    async fillConfirmPassword(ConfirmPassword: string){
        await this.page.getByRole('textbox').nth(4).fill(ConfirmPassword);
    }

    async isUserRoleErrorVisible():Promise<boolean>{
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }

    async isStatusErrorVisible():Promise<boolean>{
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }

    async isEmployeeNameErrorVisible():Promise<boolean>{
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }

    async isUsernameErrorVisible():Promise<boolean>{
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }

    async isPasswordErrorVisible():Promise<boolean>{
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }

    async isConfirmPasswordErrorVisible():Promise<boolean>{
        const error = this.page.locator('span.oxd-text.oxd-text--span.oxd-input-field-error-message')
            .filter({ hasText: 'Required' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }

    async clickSaveButton(){
        await this.page.getByRole('button', {name: 'Save' }).click();
    }
    async clickCancelButton(){
        await this.page.getByRole('button', {name: 'Cancel' }).click();
    }

    async isUserExist(name: string):Promise<boolean>{
        const adduserpage = new UserPage(this.page)
        return await adduserpage.isUserExist(name);
    }

    async isPasswordWeakVisible():Promise<boolean>{
        const error = this.page.locator('"oxd-chip oxd-chip--default')
            .filter({ hasText: 'Weak' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }

    async isPasswordBetterVisible():Promise<boolean>{
        const error = this.page.locator('"oxd-chip oxd-chip--default')
            .filter({ hasText: 'Better' })
        await error.first().waitFor({ state: 'visible', timeout: 5000 });
        return await error.count() > 0;
    }
    
}