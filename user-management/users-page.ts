import { Page, expect} from "@playwright/test";
import { AdminPage } from "../AdminPage";

export class UserPage{
    constructor(public page: Page){

    }
    async clickAddButton(){
        const adminpage = new AdminPage(this.page);
        await this.page.getByRole('button', {name: 'Save' });
    }
    async fillUsersDetails(UserRole: 'Admin' | 'ESS', EmployeeName: string, Status: 'Admin' | 'ESS', Username: string, Password: string, ConfirmPassword: string){
        await this.page.locator('.oxd-select-text').first().click();
        await this.page.getByRole('option', { name: UserRole }).click();
        await this.page.locator('.oxd-select-text.oxd-select-text--focus').click();
    }
}