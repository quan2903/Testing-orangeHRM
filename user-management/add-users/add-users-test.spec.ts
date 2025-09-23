import {test, expect} from '@playwright/test';
import { AdminPage } from '../../AdminPage';
import { AddUsersAction } from '../add-users/add-users-action';
import {UsersFactory} from '../users-factory';
import { LoginPage } from '../../login/login-page/LoginPage';

test.describe('Kiểm tra chức năng thêm người dùng mới', () => {
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('admin', 'admin123');
        const adminPage = new AdminPage(page);
        await adminPage.goto();

    });
    test('Thêm người dùng mới với dữ liệu hợp lệ', async ({page}) => {
        const adminPage = new AdminPage(page);
        await adminPage.goto();
        const addUsersAction = new AddUsersAction(page);
        const user = new UsersFactory().createValidUser();
        const isUserAdded = await addUsersAction.addUserandVerify(user.UserRole, user.EmployeeName, user.Status, user.Username, user.Password, user.ConfirmPassword);
        expect(isUserAdded).toBe(true);
    });
});