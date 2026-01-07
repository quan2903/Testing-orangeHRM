import { test, expect } from '@playwright/test';
import { LoginPage } from "../../../login/login-page/LoginPage";
import { QualificationsPage } from "../../qualification-page";
import { EditEducationAction } from './edit-education-action';
import { EducationFactory } from '../education-factory';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;



test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

    const qualificationsPage = new QualificationsPage(page);
    await qualificationsPage.goto();
    await qualificationsPage.navigateToEducation();
});

test.describe('Kiểm tra chỉnh sửa học vấn', () => {

    test('Tên học vấn có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();
        
        const education = factory.createValidNameWith1CharacterAndNumberCharacters();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn có 99 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createValidNameWith99CharactersAndSpecialCharacters();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn có 100 ký tự, toàn bộ là ký tự chữ và có tiếng Việt', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createValidNameWith100CharactersAndAllVietNameseCharacters();
        await action.goto();
        await action.editEducation(education.name );
      expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn tiếng Trung', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createValidNameWithChineseCharacters();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn có 1 ký tự space ở đầu', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createNameWithOneSpaceAtStart();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn có 1 ký tự space ở cuối', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createNameWithOneSpaceAtEnd();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn có nhiều ký tự space ở đầu', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createNameWithMultipleSpacesAtStart();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn có nhiều ký tự space ở cuối', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createNameWithMultipleSpacesAtEnd();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn được paste hợp lệ', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createValidPastableName();
        await action.goto();
        await action.editEducation(education.name);
        expect (await action.isEducationExist(education.name) )
    });

    test('Tên học vấn trùng nhưng khác hoa/thường', async ({ page }) => {
        const action = new EditEducationAction(page);
        const factory = new EducationFactory();

        const education = factory.createNameWithDifferentCase();
        await action.goto();
        await action.editEducation(education.name);

        expect(await action.isNameErrorVisible()).toBeFalsy();
        expect (await action.isEducationExist(education.name) )
    });

});
