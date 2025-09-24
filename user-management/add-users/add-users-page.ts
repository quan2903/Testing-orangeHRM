import {Page    } from "@playwright/test";
import { UserPage } from "../users-page";
export class AddUserPage{
    constructor (private page: Page){
       
    }
    async goto(){
        const adduserpage = new UserPage(this.page)
        await adduserpage.clickAddButton();
    }
    async fillUsersDetails(UserRole: 'Admin' | 'ESS', EmployeeName: string, Status: 'Enabled'|'Disabled', Username: string, Password: string, ConfirmPassword: string){
        const adduserpage = new UserPage(this.page)
        await adduserpage.fillUsersDetails(UserRole, EmployeeName, Status, Username, Password, ConfirmPassword);
    }
    async clickSaveButton(){
        await this.page.getByRole('button', {name: 'Save' }).click();
    }
    async isUserExist(name: string):Promise<boolean>{
        const adduserpage = new UserPage(this.page)
        return await adduserpage.isUserExist(name);
    }
}