import { test, expect } from '@playwright/test';
import { EditLicenseAction } from './edit-licenses-action';
import { QualificationsPage } from '../../qualification-page';
import { LoginPage } from '../../../login/login-page/LoginPage';
import { LicenseFactory } from '../licenses-factory';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

  const qualificationsPage = new QualificationsPage(page);
  await qualificationsPage.goto();
  await qualificationsPage.navigateToLicenses();
});

test.describe('Chỉnh sửa giấy phép - các hành vi hợp lệ và cạnh biên', () => {
  test('Tên có 1 ký tự số/chữ', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWith1Digit();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeFalsy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên có 99 ký tự đặc biệt', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWith99SpecialCharacters();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên có 100 ký tự tiếng Việt', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWith100VietnameseCharacters();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên là ký tự tiếng Trung', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWithChineseCharacters();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên có thể paste từ clipboard', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createValidPastableName();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên có 1 space ở đầu', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWithOneSpaceAtStart();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên có 1 space ở cuối', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWithOneSpaceAtEnd();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên có nhiều space ở đầu', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWithMultipleSpacesAtStart();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Tên có nhiều space ở cuối', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWithMultipleSpacesAtEnd();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });

  test('Trùng tên nhưng khác hoa thường', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const baseName = await action.getFirstLicenseName();
    const license = factory.createNameDuplicateDifferentCase(baseName);
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeTruthy();
  });
});

test.describe('Chỉnh sửa giấy phép không hợp lệ', () => {
  test('Tên để trống', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createEmptyName();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeFalsy();
  });

  test('Tên có 101 ký tự', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWith101Characters();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeFalsy();
  });

  test('Tên có 300 ký tự', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWith300Characters();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeFalsy();
  });

  test('Tên toàn space', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const license = factory.createNameWithOnlySpaces();
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeFalsy();
  });

  test('Tên trùng với tên có sẵn', async ({ page }) => {
    const action = new EditLicenseAction(page);
    const factory = new LicenseFactory();

    await action.goto();
    const baseName = await action.getFirstLicenseName();
    const license = factory.createDuplicateName(baseName);
    await action.fillAndSaveLicense(license);
    expect(await action.isNameErrorVisible()).toBeTruthy();
    expect(await action.isLicenseExist(license.name!)).toBeFalsy();
  });
});
