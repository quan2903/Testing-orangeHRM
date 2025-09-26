import test from "playwright/test";
import { LoginPage } from "../login-page/LoginPage";
import dotenv from 'dotenv';

dotenv.config();
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test('Login thanh cong voi username va password hop le', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
});
