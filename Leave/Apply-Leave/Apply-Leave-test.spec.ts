import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Admin/login/login-page/LoginPage';
import { LeavePage } from '../Leave-Page';
import { ApplyLeavePage } from './Apply-Leave-Page';
import { ApplyLeaveAction } from './Apply-Leave-Action';
import { ApplyLeaveFactory } from './Apply-Leave-Factory';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
    const leavePage = new LeavePage(page);
    await leavePage.goto();
    const applyPage = new ApplyLeavePage(page);
    await applyPage.goto();
});

test.describe('Apply Leave - Test Cases', () => {

    test('TC01 - 1 ngày hợp lệ với Comment 1 ký tự số', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createComment1CharacterAllNumber();

        await action.updatePersonalDetails(data);

        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });

    test('TC02 - Nửa buổi sáng với Comment 249 ký tự chữ', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createComment249CharactersAllAlphabet();

        await action.updatePersonalDetails(data);

        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });

    test('TC03 - Nửa buổi chiều với Comment 250 ký tự đặc biệt', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createComment250CharactersAllSpecial();

        await action.updatePersonalDetails(data);

        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });

    test('TC04 - Gán nghỉ 1 ca làm hợp lệ (Specify Time)', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createValidSpecificTime();

        await action.updatePersonalDetails(data);

        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });

    test('TC05 - Gán nghỉ nhiều ngày từ hôm nay', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createMultiDayValidFromToday(3);

        await action.updatePersonalDetails(data);

        await expect(page.getByText('Successfully Saved')).toBeVisible();
    });

    // ================= NEGATIVE =================

    test('TC06 - Không chọn From Date', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createWithoutFromDate();

        await action.updatePersonalDetails(data);
        await action.saveChanges()
        await expect(page.locator('.oxd-input-field-error-message').first()).toBeVisible();
    });

    test('TC07 - Không chọn To Date', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createComment1CharacterAllNumber();
        delete data.toDate;

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC08 - From Date sau To Date', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createFromDateAfterToDate();

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC09 - Nghỉ 1 ngày trong quá khứ', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createOneDayInPast();

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC10 - Nghỉ nhiều ngày từ quá khứ tới tương lai', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createMultiDayPastToFuture();

        await action.updatePersonalDetails(data);

        await expect(page.getByText(/Already applied|Invalid date range/)).toBeVisible();
    });

    test('TC11 - Specific Time From > To', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createSpecificTimeFromAfterTo();

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC12 - Specific Time sai định dạng', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createSpecificTimeInvalidFormat();

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC13 - Specific Time vượt 1 ca làm', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createSpecificTimeExceedOneShift();

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC14 - Comment 251 ký tự', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createComment251Characters();

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

    test('TC15 - Comment 300 ký tự', async ({ page }) => {
        const action = new ApplyLeaveAction(page);
        const data = new ApplyLeaveFactory().createComment300Characters();

        await action.updatePersonalDetails(data);

        await expect(page.locator('.oxd-input-field-error-message')).toBeVisible();
    });

});

