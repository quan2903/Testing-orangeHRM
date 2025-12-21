import { test, expect } from '@playwright/test';
import { EditPayGradeAction } from './edit-pay-grades-action';
import { PayGradeFactory } from '../pay-grade-factory';


test.describe('Edit Pay Grade - salary & currency validation cases', () => {

  test('Chỉnh sửa dải lương với thông tin tối thiểu', async ({ page }) => {
    const action = new EditPayGradeAction(page);

     await action.editAndVerifyPayGrade;
    expect(await action.isCurrencyErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối thiểu = 1', async ({ page }) => {
    const action = new EditPayGradeAction(page);

     await action.editAndVerifyPayGrade;
    expect(await action.isMinimumSalaryErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối thiểu = 0', async ({ page }) => {
    const action = new EditPayGradeAction(page);

     await action.editAndVerifyPayGrade;
    expect(await action.isMinimumSalaryErrorVisible()).toBeTruthy();
  });

  test('Chỉnh sửa với lương tối đa = 999,999,999', async ({ page }) => {
    const action = new EditPayGradeAction(page);

     await action.editAndVerifyPayGrade;
    expect(await action.isMaximumSalaryErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối đa = 1,000,000,000', async ({ page }) => {
    const action = new EditPayGradeAction(page);

     await action.editAndVerifyPayGrade;
    expect(await action.isMaximumSalaryErrorVisible()).toBeTruthy();
  });

  test('Chỉnh sửa với lương tối thiểu dạng thập phân 1 chữ số', async ({ page }) => {
    const action = new EditPayGradeAction(page);

    await action.editAndVerifyPayGrade;
    expect(await action.isMinimumSalaryErrorVisible()).toBeFalsy();
  });

  test('Chỉnh sửa với lương tối thiểu < lương tối đa', async ({ page }) => {
    const action = new EditPayGradeAction(page);

    await action.editAndVerifyPayGrade;
    expect(await action.isMinimumSalaryErrorVisible()).toBeFalsy();
    expect(await action.isMaximumSalaryErrorVisible()).toBeFalsy();
  });

});
