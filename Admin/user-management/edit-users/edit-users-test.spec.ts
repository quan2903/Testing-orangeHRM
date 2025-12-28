import {test, expect} from '@playwright/test';
import { AdminPage } from '../../AdminPage';
import {EditUsersAction} from '../edit-users/edit-users-action';
import { UsersFactory } from '../users-factory';
import { UserPage } from '../users-page';
import { LoginPage } from '../../login/login-page/LoginPage';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.describe('Chức năng chỉnh sửa người dùng thành công', () => {
    test.beforeEach( async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công với 5 ký tự', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_5Chars();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công với 6 ký tự', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_6Chars();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công với 39 ký tự', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_39Chars();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công với 40 ký tự', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_40Chars();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công với tiếng Việt có dấu', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_VietnameseChars();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công với tiếng Trung', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_ChineseChars();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công khi có space ở đầu + 5 ký tự ở sau', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_1SpaceBefore();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công khi có space ở cuối + 5 ký tự ở đầu', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_1SpaceAfter();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin username thành công khi có 5 ký tự và space ở giữa', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Username_1SpaceMiddle();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin Password thành công khi có ký tự có dấu', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Password_VietnameseChars();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin Password thành công khi có emoji', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Password_Emoji();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin Password khi ở trạng thái Weak', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Password_Weak();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });

    test('Kiểm tra việc chỉnh sửa thông tin Password khi ở trạng thái Better', async ({page}) => {
        const editUsersAction = new EditUsersAction(page);
        const user = new UsersFactory().createValidUser_Password_Better();
        await editUsersAction.editUser(user);
        const userPage = new UserPage(page);
        const isUserExist = await userPage.isUserExist(user.Username!);
        expect(isUserExist).toBe(true);
    });
});