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

test.describe('Kiểm tra chức năng chỉnh sửa thông tin cá nhân', () => {

    test('First name 1 ký tự và toàn bộ ký tự đặc biệt không sinh lỗi độ dài', async ({page}) => {
        const personalDetailsAction = new PersonalDetailsAction(page);
        const personalDetailsFactory = new PersonalDetailsFactory();
        const personalDetailsData = personalDetailsFactory.createFirstName1CharacterAndAllSpecialCharacter();
        await personalDetailsAction.updatePersonalDetails(personalDetailsData);
        const isFirstNameErrorVisible = await personalDetailsAction.isFirstNameErrorVisible();
        expect(isFirstNameErrorVisible).toBeFalsy();
    });

    test('Middle name 29 ký tự toàn số không sinh lỗi độ dài', async ({page}) => {
        const personalDetailsAction = new PersonalDetailsAction(page);
        const personalDetailsFactory = new PersonalDetailsFactory();
        const data = personalDetailsFactory.createMiddleName29CharactersAndAllNumberCharacters();
        await personalDetailsAction.updatePersonalDetails(data);
        const isMiddleNameErrorVisible = await personalDetailsAction.isMiddleNameErrorVisible();
        expect(isMiddleNameErrorVisible).toBeFalsy();
    });

    test('Ngày hết hạn bằng định dạng sai sẽ hiển thị lỗi', async ({page}) => {
        const personalDetailsAction = new PersonalDetailsAction(page);
        await personalDetailsAction.fillLicenseExpiryDate('31/12/2030');
        await personalDetailsAction.saveChanges();
        const hasError = await personalDetailsAction.isLicenseExpiryDateErrorVisible();
        expect(hasError).toBeTruthy();
    });

    test('Ngày sinh quá xa trong tương lai sẽ hiển thị lỗi', async ({page}) => {
        const personalDetailsAction = new PersonalDetailsAction(page);
        await personalDetailsAction.fillDateOfBirth('01-01-3000');
        await personalDetailsAction.saveChanges();
        const hasError = await personalDetailsAction.isDateOfBirthErrorVisible();
        expect(hasError).toBeTruthy();
    });

    test('Chọn quốc tịch bằng từ khóa và chọn mục thứ 3 trong danh sách', async ({page}) => {
        const personalDetailsAction = new PersonalDetailsAction(page);
        const personalDetailsPage = new PersonalDetailsPage(page);
        const selected = await personalDetailsPage.chooseRandomNationality('a');
        expect(selected && selected.length > 0).toBeTruthy();
    });
});