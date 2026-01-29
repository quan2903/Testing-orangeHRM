import { test, expect } from "@playwright/test";
import { LoginPage } from "../../login/login-page/LoginPage";
import { NationalitiesPage } from "../nationalities-page";
import { AddNationalitiesAction } from "./add-nationalities-action";
import { NationalitiesFactory } from "../nationalities-factory";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

  const nationalitiesPage = new NationalitiesPage(page);
  await nationalitiesPage.goto();
});


test.describe("Kiểm tra thêm mới quốc tịch hợp lệ", () => {
  const factory = new NationalitiesFactory();

  test("Tên quốc tịch có 1 ký tự, toàn bộ là ký tự số", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWith1NumericCharacter();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch có 99 ký tự, toàn bộ là chữ và có tiếng Việt", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWith99VietnameseCharacters();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch có 100 ký tự, toàn bộ là ký tự đặc biệt", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWith100SpecialCharacters();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch tiếng Trung", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWithChineseCharacters();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch có 1 ký tự space ở đầu", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWith1LeadingSpace();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch có 1 ký tự space ở cuối", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWith1TrailingSpace();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch có nhiều ký tự space ở đầu", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWithLeadingSpaces();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch có nhiều ký tự space ở cuối", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameWithTrailingSpaces();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch được paste hợp lệ", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createValidNameByPastingText();

    await action.addAndVerifyNationality({ name: data.name });
  });

  test("Tên quốc tịch trùng nhưng khác hoa/thường", async ({ page }) => {
    const action = new AddNationalitiesAction(page);

    const base = factory.createValidName();
    await action.addAndVerifyNationality({ name: base.name });

    const dup = factory.createSameNameDifferentCase(base.name!);
    await action.addNationality({ name: dup.name });

    const exists = await action.isNationalityExist(dup.name!);
    expect(exists).toBeTruthy();
  });
});

/* =========================
   THÊM MỚI QUỐC TỊCH KHÔNG HỢP LỆ
========================= */
test.describe("Kiểm tra thêm mới quốc tịch không hợp lệ", () => {
  const factory = new NationalitiesFactory();

  test("Tên quốc tịch để trống", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createInvalidEmptyName();

    await action.addNationality({ name: data.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch có 101 ký tự", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createInvalidNameWith101Characters();

    await action.addNationality({ name: data.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch có 300 ký tự", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createInvalidNameWith300Characters();

    await action.addNationality({ name: data.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch toàn ký tự space", async ({ page }) => {
    const action = new AddNationalitiesAction(page);
    const data = factory.createInvalidNameWithOnlySpaces();

    await action.addNationality({ name: data.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });

  test("Tên quốc tịch trùng hoàn toàn với quốc tịch có sẵn", async ({ page }) => {
    const action = new AddNationalitiesAction(page);

    const existingName = factory.createValidName();
    await action.addAndVerifyNationality({ name: existingName.name });

    await action.addNationality({ name: existingName.name });
    expect(await action.isNameErrorVisible()).toBeTruthy();
  });
});
