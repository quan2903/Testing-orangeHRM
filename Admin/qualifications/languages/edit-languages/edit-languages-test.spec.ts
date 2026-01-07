import { test, expect } from '@playwright/test';
import { LoginPage } from "../../../login/login-page/LoginPage";
import { QualificationsPage } from "../../qualification-page";
import { EditLanguageAction } from './edit-languages-action';
import { LanguageFactory } from '../languages-factory';
import { LanguagePage } from '../languages-page';


const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

    const qualificationsPage = new QualificationsPage(page);
    await qualificationsPage.goto();
    await qualificationsPage.navigateToLanguages();
});

test.describe('Kiểm tra chỉnh sửa ngôn ngữ', () => {
    
    test('Tên ngôn ngữ có 1 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createValidNameWith1CharacterAndNumber();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ có 119 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createValidNameWith119SpecialCharacters();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ có 120 ký tự, toàn bộ là ký tự chữ và có tiếng Việt', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createValidNameWith120VietnameseCharacters();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ tiếng Trung', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createValidNameWithChineseCharacters();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ có 1 ký tự space ở đầu', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createNameWithOneSpaceAtStart();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ có 1 ký tự space ở cuối', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createNameWithOneSpaceAtEnd();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ có nhiều ký tự space ở đầu', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createNameWithMultipleSpacesAtStart();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ có nhiều ký tự space ở cuối', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createNameWithMultipleSpacesAtEnd();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ được paste hợp lệ', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();

        const language = factory.createValidPastableName();
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
    });

    test('Tên ngôn ngữ trùng nhưng khác hoa/thường', async ({ page }) => {
        const action = new EditLanguageAction(page);
        const factory = new LanguageFactory();
        const editpage  = new LanguagePage(page);
        const basename = await editpage.getThirdLanguageName();
        const language = factory.createNameWithDifferentCase(basename!);
        await action.goto();
        await action.editLanguage(language.name);
        expect(await action.isLanguageExist(language.name!)).toBeTruthy();
        expect(await action.isNameErrorVisible()).toBeFalsy();
    });

});
