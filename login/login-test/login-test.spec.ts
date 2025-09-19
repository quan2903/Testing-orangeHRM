import test from "playwright/test";
import { LoginPage } from "../login-page/LoginPage";



test('Login thanh cong voi username va password hop le', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'admin123');
});
