import { EditUserPage } from "./edit-users-page";
import { Page } from "@playwright/test";

type UserInput = Partial<{
    UserRole: 'Admin' | 'ESS';
    Status: 'Enabled' | 'Disabled';
    EmployeeName: string;
    Username: string;
    Password: string;
    ConfirmPassword: string;
}>;
export class EditUsersAction {
    constructor(private page: Page) {}
    async editUser(user: UserInput) {
         const editUserPage = new EditUserPage(this.page);
         await editUserPage.goto(user.Username!);
 
         if (user.UserRole !== undefined) await editUserPage.fillUserRole(user.UserRole);
         if (user.Status !== undefined) await editUserPage.fillStatus(user.Status);
         if (user.EmployeeName !== undefined) await editUserPage.fillEmployeeName(user.EmployeeName);
         if (user.Username !== undefined) await editUserPage.fillUsername(user.Username);
         if (user.Password !== undefined) await editUserPage.fillPassword(user.Password);
         if (user.ConfirmPassword !== undefined) await editUserPage.fillConfirmPassword(user.ConfirmPassword);
 
         await editUserPage.clickSaveButton();
     }
     async editUserWithoutChooseEmployeeName(user: UserInput) {
         const editUserPage = new EditUserPage(this.page);
         await editUserPage.goto(user.Username!);
         if (user.UserRole !== undefined) await editUserPage.fillUserRole(user.UserRole);
         if (user.Status !== undefined) await editUserPage.fillStatus(user.Status);
         if (user.EmployeeName !== undefined) await editUserPage.fillEmployeeNameNotSelect(user.EmployeeName);
         if (user.Username !== undefined) await editUserPage.fillUsername(user.Username);
         if (user.Password !== undefined) await editUserPage.fillPassword(user.Password);
         if (user.ConfirmPassword !== undefined) await editUserPage.fillConfirmPassword(user.ConfirmPassword);
     }
 
     async editUserWithoutSave(user: UserInput) {
         const editUserPage = new EditUserPage(this.page);
         await editUserPage.goto(user.Username!);

         if (user.UserRole !== undefined) await editUserPage.fillUserRole(user.UserRole);
         if (user.Status !== undefined) await editUserPage.fillStatus(user.Status);
         if (user.EmployeeName !== undefined) await editUserPage.fillEmployeeName(user.EmployeeName);
         if (user.Username !== undefined) await editUserPage.fillUsername(user.Username);
         if (user.Password !== undefined) await editUserPage.fillPassword(user.Password);
         if (user.ConfirmPassword !== undefined) await editUserPage.fillConfirmPassword(user.ConfirmPassword);
     }
 
     async isUserRoleErrorVisible() {
         const page = new EditUserPage(this.page);
         return await page.isUserRoleErrorVisible();
     }
 
     async isStatusErrorVisible() {
         const page = new EditUserPage(this.page);
         return await page.isStatusErrorVisible();
     }
 
     async isUsernameErrorVisible() {
         const page = new EditUserPage(this.page);
         return await page.isUsernameErrorVisible();
     }
 
     async isEmployeeNameErrorVisible() {
         const page = new EditUserPage(this.page);
         return await page.isEmployeeNameErrorVisible();
     }
 
     async isPasswordErrorVisible() {
         const page = new EditUserPage(this.page);
         return await page.isPasswordErrorVisible();
     }
 
     async isConfirmPasswordErrorVisible() {
         const page = new EditUserPage(this.page);
         return await page.isConfirmPasswordErrorVisible();
     }
 
     async canceleditUser() {
         const page = new EditUserPage(this.page);
         await page.clickCancelButton();
     }
 
     async isUserExist(name: string):Promise<boolean>{
         const edituserpage = new EditUserPage(this.page)
         return await edituserpage.isUserExist(name);
     }
 
 }
 