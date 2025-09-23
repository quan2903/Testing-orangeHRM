import { Page, expect} from "@playwright/test";
import { AdminPage } from "../AdminPage";

export class UserPage{
    constructor(public page: Page){

    }
    async clickAddButton(){
        await this.page.getByRole('button', {name: 'Add' }).click();
    }
    async fillUsersDetails(UserRole: 'Admin' | 'ESS', EmployeeName: string, Status: 'Enabled'|'Disabled', Username: string, Password: string, ConfirmPassword: string) {
    // chọn role
    await this.page.locator('.oxd-input-group')
        .filter({ hasText: 'User Role' })
        .locator('.oxd-select-text')
        .click();
    await this.page.getByRole('option', { name: UserRole }).click();

    // chọn status
    await this.page.locator('.oxd-input-group')
        .filter({ hasText: 'Status' })
        .locator('.oxd-select-text')
        .click();
    await this.page.getByRole('option', { name: Status }).click();
    
    await this.page.locator('.oxd-input-group')
        .filter({ hasText: 'Employee Name' })
        .locator('input')
        .fill(EmployeeName);
    await this.page.waitForTimeout(2000);
    await this.page.getByRole('option').first().click();
    // điền username
    await this.page.locator('.oxd-input-group')
        .filter({ hasText: 'Username' })
        .locator('input')
        .fill(Username);
    

        await this.page.getByRole('textbox').nth(3).fill(Password);
    
        await this.page.getByRole('textbox').nth(4).fill(ConfirmPassword);


    }
    async clickEditButton(name: string) {
        const User = this.page.locator(`.oxd-table-card >> text=${name}`);
        await User.first().waitFor({ state: 'visible', timeout: 10000 });
        await User.locator('button:has(i.icon-pencil)').click();
    }
    async clickDeleteButton(name:string){
        const User = this.page.locator(`.oxd-table-card >> text=${name}`);
        await User.first().waitFor({ state: 'visible', timeout: 10000 });
        await User.locator('button:has(i.icon-trash)').click();
    }
    async isUserExist(name: string):Promise<boolean>{
        const User = this.page.locator(`.oxd-table-card >> text=${name}`);
        await User.first().waitFor({ state: 'visible', timeout: 30000 });
        return await User.count() > 0;
    }
}