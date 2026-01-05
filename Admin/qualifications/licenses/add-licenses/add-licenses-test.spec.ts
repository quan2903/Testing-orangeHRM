import { test, expect } from '@playwright/test';
import { AddLicenseAction } from './add-licenses-action';
import { QualificationsPage } from '../../qualification-page';
import { LoginPage } from '../../../login/login-page/LoginPage';
import { LicenseFactory } from '../licenses-factory';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Mirror test style used across the project (e.g., skills add tests)
test.beforeEach(async ({ page }) => {
  const loginpage = new LoginPage(page);
  await loginpage.goto();
  await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
  const qualificationsPage = new QualificationsPage(page);
  await qualificationsPage.goto();
  await qualificationsPage.navigateToLicenses();
});

test.describe('Thêm mới giấy phép - các hành vi hợp lệ và cạnh biên', () => {
  test('Kiểm tra thêm mới license với tên có 1 ký tự, toàn bộ là ký tự số/chữ', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createValidNameWith1CharacterAndNumberCharacters();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên có 99 ký tự, toàn bộ là ký tự đặc biệt', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createValidNameWith99CharactersAndSpecialCharacters();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên có 100 ký tự, bao gồm tất cả ký tự tiếng Việt', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createValidNameWith100CharactersAndAllVietNameseCharacters();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên là ký tự tiếng Trung', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createValidNameWithChineseCharacters();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên có thể dán từ clipboard', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createValidPastableName();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên có 1 ký tự space ở đầu', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithOneSpaceAtStart();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên có 1 ký tự space ở cuối', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithOneSpaceAtEnd();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên có nhiều ký tự space ở đầu', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithMultipleSpacesAtStart();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép với tên có nhiều ký tự space ở cuối', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithMultipleSpacesAtEnd();
    const errorVisible = await action.addAndVerifyLicense(license);
    expect(errorVisible).toBeTruthy();
  });

  test('Kiểm tra thêm mới giấy phép trùng tên nhưng khác hoa/thường', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const baseName = await action.copyLicense();
    const variant = factory.createNameWithDifferentCase(baseName);
    const errorVisible = await action.addAndVerifyLicense(variant);
    expect(errorVisible).toBeTruthy();
  });


});
