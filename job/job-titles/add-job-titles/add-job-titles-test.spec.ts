    import { test, expect } from '@playwright/test';
    import { AddJobTitlesPage } from "./add-job-titles-page";
    import { JobTitlesPage } from "../job-title-page";
    import { JobTitleFactory } from "../job-titles-factory";
    import { LoginPage } from "../../../login/login-page/LoginPage";
    import { JobPage } from '../../job-page';
    import { AdminPage } from '../../../AdminPage';
    import { AddJobTitlesAction } from './add-job-titles-action';
    import JobTitle from '../job-titles-type';
    import dotenv from 'dotenv';
    dotenv.config();
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    test.beforeEach(async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.goto();
        await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
        const jobpage = new JobPage(page);
        await jobpage.goto();
        await jobpage.navigateToJobTitles();

    });

    test.describe("Kiểm tra thêm chức danh công việc mới hợp lệ", () => {
        test("Thêm chức danh công việc với dữ liệu hợp lệ", async ({ page }) => {
            const addJobTitles = new AddJobTitlesAction(page);
            await addJobTitles.goto();
            const jobtiltefactory = new JobTitleFactory();
            const jobtitlesdata: JobTitle = jobtiltefactory.createValidNameWith100Characters();
            await addJobTitles.addandverifyJobTitles(jobtitlesdata.name, jobtitlesdata.description, jobtitlesdata.note, jobtitlesdata.file);
        });
        test("thêm chức danh công việc mới với tên công việc và mô tả công việc có 1 ký tự", async ({page})=> {
            const addJobTitles = new AddJobTitlesAction(page);
            await addJobTitles.goto();
            const jobtiltefactory = new JobTitleFactory();
            const jobtitlesdata: JobTitle = jobtiltefactory.createValidDescriptionWith1Characters();
            await addJobTitles.addandverifyJobTitles(jobtitlesdata.name, jobtitlesdata.description, jobtitlesdata.note, jobtitlesdata.file);            
        })
        test("Kiểm tra thêm chức danh công việc mới với tên công việc và mô tả công việc có 399 ký tự", async ({page}) =>{
            const addJobTitles = new AddJobTitlesAction(page);
            await addJobTitles.goto();
            const jobtiltefactory = new JobTitleFactory();
            const jobtitlesdata: JobTitle = jobtiltefactory.createValidDescriptionWith399Characters();
            await addJobTitles.addandverifyJobTitles(jobtitlesdata.name, jobtitlesdata.description, jobtitlesdata.note, jobtitlesdata.file);            
        })
        // test("Kiểm tra thêm chức danh công việc mới với tên công việc có 1 ký tự", async ({page}) =>{
        //     const addJobTitlesPage = new AddJobTitlesPage(page);
        //     add
        // });
    });
