import { test, expect } from '@playwright/test';
import { AddLicenseAction } from './add-licenses-action';
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

test.describe('Thêm mới giấy phép - các hành vi hợp lệ', () => {
  test('Tên có 1 ký tự số/chữ', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWith1Digit();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên có 99 ký tự đặc biệt', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWith99SpecialCharacters();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên có 100 ký tự tiếng Việt', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWith100VietnameseCharacters();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên là ký tự tiếng Trung', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithChineseCharacters();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên có thể paste từ clipboard', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createValidPastableName();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên có 1 space ở đầu', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithOneSpaceAtStart();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên có 1 space ở cuối', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithOneSpaceAtEnd();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên có nhiều space ở đầu', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithMultipleSpacesAtStart();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Tên có nhiều space ở cuối', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithMultipleSpacesAtEnd();
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });

  test('Trùng tên nhưng khác hoa thường', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const baseName = await action.getFirstLicenseName();
    const license = factory.createNameDuplicateDifferentCase(baseName);
    await action.addLicense(license);
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeTruthy();
  });
});

test.describe('Thêm mới giấy phép không hợp lệ', () => {
  test('Tên để trống', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createEmptyName();
    await action.addLicense(license);
    const errorVisible = await action.isNameErrorVisible();
    expect(errorVisible).toBeTruthy();
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeFalsy();
  });

  test('Tên có 101 ký tự', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWith101Characters();
    await action.addLicense(license);
    const errorVisible = await action.isNameErrorVisible();
    expect(errorVisible).toBeTruthy();
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeFalsy();
  });

  test('Tên có 300 ký tự', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWith300Characters();
    await action.addLicense(license);
    const errorVisible = await action.isNameErrorVisible();
    expect(errorVisible).toBeTruthy();
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeFalsy();
  });

  test('Tên toàn space', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const license = factory.createNameWithOnlySpaces();
    await action.addLicense(license);
    const errorVisible = await action.isNameErrorVisible();
    expect(errorVisible).toBeTruthy();
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeFalsy();
  });

  test('Tên trùng với tên có sẵn', async ({ page }) => {
    const action = new AddLicenseAction(page);
    const factory = new LicenseFactory();
    const baseName = await action.getFirstLicenseName();
    const license = factory.createDuplicateName(baseName);
    await action.addLicense(license);
    const errorVisible = await action.isNameErrorVisible();
    expect(errorVisible).toBeTruthy();
    const isExist = await action.isLicenseExist(license.name!);
    expect(isExist).toBeFalsy();
  });
});
