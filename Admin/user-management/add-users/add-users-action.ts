import { HelpersModule } from "@faker-js/faker";
import { AddUserPage } from "./add-users-page";
import { Page } from "@playwright/test";

type UserInput = Partial<{
    UserRole: 'Admin' | 'ESS';
    Status: 'Enabled' | 'Disabled';
    EmployeeName: string;
    Username: string;
    Password: string;
    ConfirmPassword: string;
}>;

export class AddUsersAction {
    constructor(private page: Page) {}

    async addUser(user: UserInput) {
        const addUserPage = new AddUserPage(this.page);
        await addUserPage.goto();

        if (user.UserRole !== undefined) await addUserPage.fillUserRole(user.UserRole);
        if (user.Status !== undefined) await addUserPage.fillStatus(user.Status);
        if (user.EmployeeName !== undefined) await addUserPage.fillEmployeeName(user.EmployeeName);
        if (user.Username !== undefined) await addUserPage.fillUsername(user.Username);
        if (user.Password !== undefined) await addUserPage.fillPassword(user.Password);
        if (user.ConfirmPassword !== undefined) await addUserPage.fillConfirmPassword(user.ConfirmPassword);

        await addUserPage.clickSaveButton();
    }
    async addUserWithoutChooseEmployeeName(user: UserInput) {
        const addUserPage = new AddUserPage(this.page);
        await addUserPage.goto();
        if (user.UserRole !== undefined) await addUserPage.fillUserRole(user.UserRole);
        if (user.Status !== undefined) await addUserPage.fillStatus(user.Status);
        if (user.EmployeeName !== undefined) await addUserPage.fillEmployeeNameNotSelect(user.EmployeeName);
        if (user.Username !== undefined) await addUserPage.fillUsername(user.Username);
        if (user.Password !== undefined) await addUserPage.fillPassword(user.Password);
        if (user.ConfirmPassword !== undefined) await addUserPage.fillConfirmPassword(user.ConfirmPassword);
    }

    async addUserWithoutSave(user: UserInput) {
        const addUserPage = new AddUserPage(this.page);
        await addUserPage.goto();

        if (user.UserRole !== undefined) await addUserPage.fillUserRole(user.UserRole);
        if (user.Status !== undefined) await addUserPage.fillStatus(user.Status);
        if (user.EmployeeName !== undefined) await addUserPage.fillEmployeeName(user.EmployeeName);
        if (user.Username !== undefined) await addUserPage.fillUsername(user.Username);
        if (user.Password !== undefined) await addUserPage.fillPassword(user.Password);
        if (user.ConfirmPassword !== undefined) await addUserPage.fillConfirmPassword(user.ConfirmPassword);
    }

    async isUserRoleErrorVisible() {
        const page = new AddUserPage(this.page);
        return await page.isUserRoleErrorVisible();
    }

    async isStatusErrorVisible() {
        const page = new AddUserPage(this.page);
        return await page.isStatusErrorVisible();
    }

    async isUsernameErrorVisible() {
        const page = new AddUserPage(this.page);
        return await page.isUsernameErrorVisible();
    }

    async isEmployeeNameErrorVisible() {
        const page = new AddUserPage(this.page);
        return await page.isEmployeeNameErrorVisible();
    }

    async isPasswordErrorVisible() {
        const page = new AddUserPage(this.page);
        return await page.isPasswordErrorVisible();
    }

    async isConfirmPasswordErrorVisible() {
        const page = new AddUserPage(this.page);
        return await page.isConfirmPasswordErrorVisible();
    }

    async cancelAddUser() {
        const page = new AddUserPage(this.page);
        await page.clickCancelButton();
    }

    async isUserExist(name: string):Promise<boolean>{
        const adduserpage = new AddUserPage(this.page)
        return await adduserpage.isUserExist(name);
    }

}
