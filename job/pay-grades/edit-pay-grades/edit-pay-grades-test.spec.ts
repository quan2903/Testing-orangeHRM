import { test, expect } from '@playwright/test';
import { EditPayGradeAction } from './edit-pay-grades-action';
import { PayGradeFactory } from '../pay-grade-factory';
import { LoginPage } from "../../../login/login-page/LoginPage";
import { JobPage } from '../../job-page';

const EXISTING_PAY_GRADE_NAME = 'Grade 1'; // Thay bằng tên dải lương thực tế hoặc tạo dải lương trong beforeEach
const ADMIN_USERNAME = process.env.ADMIN_USERNAME 
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    test.beforeEach(async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.goto();
        await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
        const jobpage = new JobPage(page);
        await jobpage.goto();
        await jobpage.navigateToPayGrades();

    });

test.describe('Edit Pay Grade - salary & currency validation cases', () => {


    test('Chỉnh sửa dải lương với thông tin tối thiểu', async ({ page }) => {
    const action = new EditPayGradeAction(page);
    const payGrade = new PayGradeFactory;
    const dt = payGrade.createEditWithCurrencyOnly();
    await action.editPayGradeWithoutSave(EXISTING_PAY_GRADE_NAME, dt);
    expect(await action.isCurrencyErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối thiểu = 1', async ({ page }) => {
    const action = new EditPayGradeAction(page);
    const payGrade = new PayGradeFactory;
    const dt = payGrade.createEditWithCurrencyAndMinimum(1);
    await action.editPayGrade(EXISTING_PAY_GRADE_NAME, dt);
    expect(await action.isMinimumSalaryErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối thiểu = 0', async ({ page }) => {
    const action = new EditPayGradeAction(page);
    const payGrade = new PayGradeFactory();
    const dt = payGrade.createEditWithCurrencyAndMinimum(0);
    await action.editPayGrade(EXISTING_PAY_GRADE_NAME, dt);
    expect(await action.isMinimumSalaryErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối đa = 999,999,999', async ({ page }) => {
    const action = new EditPayGradeAction(page);
    const payGrade = new PayGradeFactory();
    const dt = payGrade.createEditWithCurrencyAndMaximum(999999999);
    await action.editPayGrade(EXISTING_PAY_GRADE_NAME, dt);
    expect(await action.isMaximumSalaryErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối đa = 1,000,000,000', async ({ page }) => {
    const action = new EditPayGradeAction(page);
    const payGrade = new PayGradeFactory();
    const dt = payGrade.createEditWithCurrencyAndMaximum(1000000000);
    await action.editPayGradeWithoutSave(EXISTING_PAY_GRADE_NAME, dt);
    expect(await action.isMaximumSalaryErrorVisible()).toBeTruthy();
  });

  test('Chỉnh sửa với lương tối thiểu dạng thập phân 1 chữ số', async ({ page }) => {
    const action = new EditPayGradeAction(page);
    const payGrade = new PayGradeFactory();
    const dt = payGrade.createEditWithCurrencyAndMinimum(1.5);
    await action.editPayGradeWithoutSave(EXISTING_PAY_GRADE_NAME, dt);
    expect(await action.isMinimumSalaryErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối thiểu < lương tối đa', async ({ page }) => {
    const action = new EditPayGradeAction(page);
    const payGrade = new PayGradeFactory();
    const dt = payGrade.createEditWithCurrencyAndMinMax(1000, 2000);
    await action.editPayGradeWithoutSave(EXISTING_PAY_GRADE_NAME, dt);
    expect(await action.isMinimumSalaryErrorVisible()).toBeFalsy();
    expect(await action.isMaximumSalaryErrorVisible()).toBeFalsy();
  });

});
