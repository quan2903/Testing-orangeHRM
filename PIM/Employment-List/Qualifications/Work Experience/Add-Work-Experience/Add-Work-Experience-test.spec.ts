import { AddWorkExperienceAction } from "./Add-Work-Experience-Action";
import { WorkExperienceFactory } from "../Work-Experience-factory";
import { test, expect } from '@playwright/test';
import { LoginPage } from "../../../../../Admin/login/login-page/LoginPage";
import { EmploymentListPage} from "../../../Employment-List-Page";
import { AddWorkExperiencePage } from "./Add-Work-Experience-Page";
import { QualificationsPage } from "../../Qualifications-Page";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
    const employmentlist = new EmploymentListPage(page);
    await employmentlist.goto();
    const qualificationsPage = new QualificationsPage(page)
    await qualificationsPage.goto();
    const addWorkExperiencePage = new AddWorkExperiencePage(page);
    await addWorkExperiencePage.goto();
});

test.describe('Kiểm tra chức năng gán kinh nghiệm làm việc cho nhân viên', async () => {

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với việc điền đủ các trường bắt buộc nhập', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithRequiredFields();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với tên công ty và chức danh có độ dài 1 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithCompanyAndJobTitle1SpecialCharacter();

        await action.addWorkExperience(data);
        await action.save();

        expect(await action.areAllFieldsValid()).toBeTruthy();
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với tên công ty và chức danh có độ dài 99 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithCompanyAndJobTitle99NumberCharacters();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với tên công ty và chức danh có độ dài 100 ký tự, toàn bộ là ký tự chữ', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithCompanyAndJobTitle100AlphabetCharacters();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();

    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với trường From cách 1 năm từ hiện tại về quá khứ', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithFromDate1YearInPast();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();        
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với trường From cách 9 năm từ hiện tại về quá khứ', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithFromDate9YearsInPast();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();        
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với trường To cách 1 năm từ hiện tại về quá khứ', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithToDate1YearInPast();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();        
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với trường To cách 9 năm từ hiện tại về quá khứ', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithToDate9YearsInPast();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();        
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với Comment có độ dài 1 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithComment1SpecialCharacter();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();        
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với Comment có độ dài 199 ký tự, toàn bộ là ký tự số', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithComment199NumberCharacters();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();        
    });

    test('Kiểm tra gán kinh nghiệm làm việc cho nhân viên với Comment có độ dài 200 ký tự, toàn bộ là ký tự chữ', async ({ page }) => {
        const action = new AddWorkExperienceAction(new AddWorkExperiencePage(page));
        const factory = new WorkExperienceFactory();
        const data = factory.createWorkExperienceWithComment200AlphabetCharacters();

        await action.addWorkExperience(data);
        await action.save();
        expect(await action.areAllFieldsValid()).toBeTruthy();        
    });

});
