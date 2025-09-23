import { Page, expect} from "@playwright/test";
import { AdminPage } from "../AdminPage";

export class UserPage{
    constructor(public page: Page){

    }
    async clickAddButton(){
        await this.page.getByRole('button', {name: 'Save' }).click();
    }
    async fillUsersDetails(UserRole: 'Admin' | 'ESS', EmployeeName: string, Status: 'Enabled'|'Disabled', Username: string, Password: string, ConfirmPassword: string){
        await this.page.locator('.oxd-select-text').first().click();
        await this.page.getByRole('option', { name: UserRole }).click();
        await this.page.locator('.oxd-select-text.oxd-select-text--focus').click();
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

}