import {test, expect} from '@playwright/test';
import { LoginPage } from '../../../Admin/login/login-page/LoginPage';
import { EmploymentListPage } from '../Employment-List-Page';
import { PersonalDetailsPage } from './Personal-Details-Page';
import { PersonalDetailsFactory } from './Personal-Details-factory';
import { PersonalDetailsAction } from './Personal-Details-Action';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
        const employmentlist = new EmploymentListPage(page);
        await employmentlist.goto();
        const personalDetailsPage = new PersonalDetailsPage(page);
        await personalDetailsPage.goto();
    });
test.describe('Kiểm tra chức năng thêm người dùng mới hợp lệ', () => {

    test('Kiểm tra chỉnh sửa thông tin cá nhân với first name có độ dài 1 ký tự, toàn bộ là ký tự đặc biệt', async ({page}) => {
        const personalDetailsAction = new PersonalDetailsAction(page);
        const personalDetailsFactory = new PersonalDetailsFactory();
        const personalDetailsData = personalDetailsFactory.createFirstName1CharacterAndAllSpecialCharacter();
        await personalDetailsAction.updatePersonalDetails(personalDetailsData);
        const isFirstNameErrorVisible = await personalDetailsAction.isFirstNameErrorVisible();
        expect(isFirstNameErrorVisible).toBeFalsy();
        
    });
});