import {test, expect} from '@playwright/test';
import { AdminPage } from '../../AdminPage';
import { AddUsersAction } from '../add-users/add-users-action';
import {UsersFactory} from '../users-factory';
import { LoginPage } from '../../login/login-page/LoginPage';
import { UserPage } from '../users-page';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


test.describe('Kiểm tra chức năng thêm người dùng mới hợp lệ', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
        const adminPage = new AdminPage(page);
        await adminPage.goto();

    });

    test('Thêm người dùng mới với dữ liệu hợp lệ', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user = new UsersFactory().createValidUser();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới thành công với username 6 ký tự', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_6Chars();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới thành công với username 39 ký tự', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_39Chars();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới thành công với username 40 ký tự', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_40Chars();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới thành công với username tiếng Việt có dấu', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_VietnameseChars();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới thành công với username tiếng Trung', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_ChineseChars();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới khi username có space ở đầu', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_1SpaceBefore();
        const username = user.Username.trim();
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới khi username có space ở cuối', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_1SpaceAfter();
        const username = user.Username.trim();
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới khi username có 5 ký tự và space ở giữa', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Username_1SpaceMiddle();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới với Password có ký tự có dấu', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Password_VietnameseChars();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới với Password có emoji', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Password_Emoji();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới khi Password chỉ có ký tự số và ký tự chữ in thường', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Password_LowercaseAndNumber();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới khi Password ở trạng thái Weak', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Password_Weak();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra thêm tài khoản mới khi Password ở trạng thái Better', async ({page}) => {
        const addUsersAction = new AddUsersAction(page);
        const user =  new UsersFactory().createValidUser_Password_Better();
        const username = user.Username;
        await addUsersAction.addUser(user);
        await page.waitForTimeout(8000);
        const userpage = await new UserPage(page);
        const isUserExist = await userpage.isUserExist(username);
        expect(isUserExist).toBe(true);
    });

});