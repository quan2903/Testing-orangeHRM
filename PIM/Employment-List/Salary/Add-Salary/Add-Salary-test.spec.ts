import { AddSalaryAction } from "./Add-Salary-Action";
import { SalaryFactory } from "./Add-Salary-factory";
import { test, expect } from '@playwright/test';
import { LoginPage } from "../../../../Admin/login/login-page/LoginPage";
import { EmploymentListPage } from "../../Employment-List-Page";
import {AddSalaryPage} from "./Add-Salary-Page";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
        const employmentlist = new EmploymentListPage(page);
        await employmentlist.goto();
        const addSalarypage = new AddSalaryPage(page);
        await addSalarypage.goto();
    });
test.describe('Kiểm tra chức năng thêm lương cho nhân viên', async () => {
    test('Kiểm tra gán thành phần lương với tên thành phần lương có độ dài 1 ký tự, toàn bộ là ký tự đặc biệt', async ({page}) => {
        const addSalaryAction = new AddSalaryAction( new AddSalaryPage(page));
        const salaryFactory = new SalaryFactory();
        const salaryDetails = salaryFactory.createSalaryWithSalaryComponent1SpecialCharacter();
        await addSalaryAction.addSalary(salaryDetails);
        await addSalaryAction.clickSaveButton();
        expect( await addSalaryAction.isSalaryComponentErrorVisible()).toBeFalsy();
    });

    test('Kiểm tra gán thành phần lương với tên thành phần lương có độ dàii 99 ký tự, toàn bộ là ký tự chữ', async ({page})=>{
        const addSalaryAction = new AddSalaryAction( new AddSalaryPage(page));
        const salaryFactory = new SalaryFactory();
        const salaryDetails = salaryFactory.createSalaryWithSalaryComponent99Characters();
        await addSalaryAction.addSalary(salaryDetails);
        await addSalaryAction.clickSaveButton();
        expect( await addSalaryAction.isSalaryComponentErrorVisible()).toBeFalsy();  
    })

    test('Kiểm tra gán thành phần lương với việc chọn bậc lương', async ({page})=>{
        const addSalaryAction = new AddSalaryAction( new AddSalaryPage(page));
        const salaryFactory = new SalaryFactory();
        const salaryDetails = salaryFactory.createSalaryWithPayGrades();
        await addSalaryAction.addSalary(salaryDetails);
        await addSalaryAction.clickSaveButton();
  
    })
});

