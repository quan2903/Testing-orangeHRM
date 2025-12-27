import { test } from '@playwright/test';
import { AddEducationPage } from './add-education-page';
import { LoginPage } from "../../../login/login-page/LoginPage";
import { EducationPage } from '../education-page';
import { AddEducationAction } from './add-education-action';
import {QualificationsPage} from "../../qualification-page";
import { EducationFactory } from '../education-factory';
import { expect } from '@playwright/test';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD


test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
    const qualificationsPage = new QualificationsPage(page);
    await qualificationsPage.goto();
    await qualificationsPage.navigateToEducation();
});

test.describe('Kiểm tra thêm mới học vấn hop le', () => {
    test('Kiểm tra thêm mới học vấn với tên học vấn có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createValidNameWith1CharacterAndNumberCharacters();
        await addEducationAction.addAndVerifyEducation({ name: education.name });
    });

    test('Kiểm tra thêm mới học vấn với tên học vấn có 99 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createValidNameWith99CharactersAndSpecialCharacters();
        await addEducationAction.addAndVerifyEducation({ name: education.name });
    });
    test('Kiểm tra thêm mới học vấn với tên học vấn có 100 ký tự, toàn bộ là ký tự chữ và có tiếng Việt', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createValidNameWith100CharactersAndAllVietNameseCharacters();
        await addEducationAction.addAndVerifyEducation({ name: education.name });
    });

    test('Kiểm tra thêm mới học vấn với tên học vấn tiếng Trung Quốc', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createValidNameWithChineseCharacters();
        await addEducationAction.addAndVerifyEducation({ name: education.name });
    });

    test('Kiểm tra thêm mới học vấn với tên học vấn có 1 ký tự space ở đầu', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createNameWithOneSpaceAtStart();
        await addEducationAction.addAndVerifyEducation({ name: education.name });
    });

    test('Kiểm tra thêm mới học vấn với tên học vấn có 1 ký tự space ở cuối', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createNameWithOneSpaceAtEnd();
        await addEducationAction.addAndVerifyEducation({ name: education.name });  
    });

    test('Kiểm tra thêm mới học vấn với tên học vấn có nhiều ký tự space ở đầu', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createNameWithMultipleSpacesAtStart();
        await addEducationAction.addAndVerifyEducation({ name: education.name });
    });

    test('Kiểm tra thêm mới học vấn với tên học vấn có nhiều ký tự space ở cuối', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const education = factory.createNameWithMultipleSpacesAtEnd();
        await addEducationAction.addAndVerifyEducation({ name: education.name });
    });

    test('Kiểm tra thêm mới học vấn với tên học vấn trùng với tên học vấn có sẵn nhưng khác hoa/thường', async ({ page }) => {
        const addEducationAction = new AddEducationAction(page);
        const factory = new EducationFactory();
        const baseEducation = factory.createValidPastableName();
        await addEducationAction.addAndVerifyEducation({ name: baseEducation.name });
        const differentCaseEducation = factory.createNameWithDifferentCase(baseEducation.name);
        await addEducationAction.addAndVerifyEducation({ name: differentCaseEducation.name });
        expect(await addEducationAction.isNameErrorVisible()).toBeFalsy();

    });


});
