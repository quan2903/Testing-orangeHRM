import {AddUserPage }from "./add-users-page";
import { Page } from "@playwright/test";

export class AddUsersAction{
    constructor (private page: Page){
    }
    async addUserandVerify(UserRole: 'Admin' | 'ESS', EmployeeName: string, Status: 'Enabled'|'Disabled', Username: string, Password: string, ConfirmPassword: string){
        const addUserPage = new AddUserPage(this.page);
        await addUserPage.goto();
        await addUserPage.fillUsersDetails(UserRole, EmployeeName, Status, Username, Password, ConfirmPassword);
        await addUserPage.clickSaveButton();
        const isUserExist = await addUserPage.isUserExist(Username);
        return isUserExist;
    }
    async addUserWithoutSaving(UserRole: 'Admin' | 'ESS', EmployeeName: string, Status: 'Enabled'|'Disabled', Username: string, Password: string, ConfirmPassword: string){
        const addUserPage = new AddUserPage(this.page);
        await addUserPage.goto();
        await addUserPage.fillUsersDetails(UserRole, EmployeeName, Status, Username, Password, ConfirmPassword);
    }
}