import { test, expect } from "@playwright/test";
import { LoginPage } from "../../login/login-page/LoginPage";
import { NationalitiesPage } from "../nationalities-page";
import { EditNationalitiesAction } from "./edit-nationalities-action";
import { NationalitiesFactory } from "../nationalities-factory";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

  const nationalitiesPage = new NationalitiesPage(page);
  await nationalitiesPage.goto();
});

test.describe("Kiểm tra chỉnh sửa quốc tịch hợp lệ", () => {
  const factory = new NationalitiesFactory();

  test("Tên quốc tịch có 1 ký tự, toàn bộ là ký tự số", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    await action.goto()
    const data = factory.createValidNameWith1NumericCharacter();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch có 99 ký tự, toàn bộ là chữ và có tiếng Việt", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameWith99VietnameseCharacters();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch có 100 ký tự, toàn bộ là ký tự đặc biệt", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameWith100SpecialCharacters();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch tiếng Trung", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameWithChineseCharacters();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch có 1 ký tự space ở đầu", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameWith1LeadingSpace();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch có 1 ký tự space ở cuối", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameWith1TrailingSpace();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch có nhiều ký tự space ở đầu", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameWithLeadingSpaces();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch có nhiều ký tự space ở cuối", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameWithTrailingSpaces();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch được paste hợp lệ", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidNameByPastingText();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });

  test("Tên quốc tịch trùng nhưng khác hoa/thường", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidName();

    const result = await action.editAndVerify(data.name);
    expect(result).toBeTruthy();
  });
});

test.describe("Kiểm tra chỉnh sửa quốc tịch không hợp lệ", () => {
  const factory = new NationalitiesFactory();

  test("Tên quốc tịch để trống", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createInvalidEmptyName();

    await action.editNationality(data.name);
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch có 101 ký tự", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createInvalidNameWith101Characters();

    await action.editNationality(data.name);
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch có 300 ký tự", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createInvalidNameWith300Characters();

    await action.editNationality(data.name);
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch toàn ký tự space", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createInvalidNameWithOnlySpaces();

    await action.editNationality(data.name);
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch trùng hoàn toàn với quốc tịch có sẵn", async ({ page }) => {
    const action = new EditNationalitiesAction(page);
    const data = factory.createValidName();

    await action.editNationality(data.name);
    expect(await action.isGlobalErrorVisible()).toBeTruthy();
  });
});
