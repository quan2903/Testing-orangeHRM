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

    test.describe('Kiểm tra thêm người dùng mới với thất bại ', () => {
        test('Kiểm tra thêm tài khoản mới với username có chứa emoji', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_Emoji();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới với username 4 ký tự', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_4Chars();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới với username 4 ký tự + space ở đầu', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_4Chars_1SpaceBefore();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới với username 4 ký tự + space ở cuối', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_4Chars_1SpaceAfter();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới với username 41 ký tự', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_41Chars();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới với username 255 ký tự', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_255Chars();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi username để trống', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_Empty();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi username toàn space', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_AllSpaces();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi username trùng với username có sẵn', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Username_Duplicate();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUsernameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi không có giá trị trong dropdown Role', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_UserRole_Empty();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isUserRoleErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới với tên nhân viên để trống', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_EmployeeName_Empty();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isEmployeeNameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới với tên nhân viên tự điền', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_EmployeeName_Empty();
            await addUsersAction.addUserWithoutChooseEmployeeName(user);
            const isErrorVisible = await addUsersAction.isEmployeeNameErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi trạng thái tài khoản không có giá trị ', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Status_Empty();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isStatusErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi Password để trống', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_Empty();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        });
        test('Kiểm tra thêm tài khoản mới khi Confirm Password để trống', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_ConfirmPassword_Empty();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isConfirmPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi Confirm Password không khớp với Password', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_ConfirmPassword_NotMatch();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isConfirmPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi Password thiếu ký tự số', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_NoNumberCharacter();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        });
        
        test('Kiểm tra thêm tài khoản mới khi Password thiếu ký tự chữ thường', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_NoLowercaseCharacter();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        
        });

        test('Kiểm tra thêm tài khoản mới khi Password 6 ký tự', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_6Chars();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi Password 6 ký tự + space ở đầu', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_6Chars_WithSpaceHead();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        });

        test('Kiểm tra thêm tài khoản mới khi Password 6 ký tự + space ở cuối', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_6Chars_WithSpaceTail();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);
        });
        
        test('Kiểm tra thêm tài khoản mới khi Password 65 ký tự', async ({page}) => {
            const addUsersAction = new AddUsersAction(page);
            const user =  new UsersFactory().createInvalidUser_Password_65Characters();
            await addUsersAction.addUser(user);
            const isErrorVisible = await addUsersAction.isPasswordErrorVisible();
            expect(isErrorVisible).toBe(true);

        });

        test ('Kiểm tra hủy thêm người dùng mới', async ({page}) => {
            const addUsersAction = new AddUsersAction (page);
            const user = new UsersFactory().createValidUser();
            await addUsersAction.addUserWithoutSave(user);
            await addUsersAction.cancelAddUser();
            await page.waitForTimeout(8000);
            const userpage = await new UserPage(page);
            const isUserExist = await userpage.isUserExist(user.Username);
            expect(isUserExist).toBe(false);
        });
    });
    
