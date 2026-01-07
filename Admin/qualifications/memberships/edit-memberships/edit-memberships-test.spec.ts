import { test, expect } from "@playwright/test";
import { EditMembershipAction } from "./edit-memberships-action";
import { QualificationsPage } from "../../qualification-page";
import { LoginPage } from "../../../login/login-page/LoginPage";
import { MembershipFactory } from "../memberships-factory";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);

    const qualificationsPage = new QualificationsPage(page);
    await qualificationsPage.goto();
    await qualificationsPage.navigateToMemberships();
});

test.describe("Chỉnh sửa thẻ hội viên - các hành vi hợp lệ và cạnh biên", () => {
    test("Tên có 1 ký tự số", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWith1Digit();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 49 ký tự đặc biệt", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWith49SpecialCharacters();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 50 ký tự tiếng Việt", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWith50VietnameseCharacters();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên là ký tự tiếng Trung", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWithChineseCharacters();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 1 space ở đầu", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWithOneSpaceAtStart();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 1 space ở cuối", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWithOneSpaceAtEnd();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có nhiều space ở đầu", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWithMultipleSpacesAtStart();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có nhiều space ở cuối", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWithMultipleSpacesAtEnd();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên được paste hợp lệ", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createValidPastableName();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên trùng nhưng khác hoa thường", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        const baseName = await action.copyMembership();
        const membership = factory.createNameDuplicateDifferentCase(baseName);

        await action.goto();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });
});

test.describe("Chỉnh sửa thẻ hội viên - các hành vi không hợp lệ", () => {
    test("Tên để trống", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createEmptyName();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên có 51 ký tự", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWith51Characters();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên có 200 ký tự", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWith200Characters();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên toàn space", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        await action.goto();
        const membership = factory.createNameWithOnlySpaces();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên trùng với tên có sẵn", async ({ page }) => {
        const action = new EditMembershipAction(page);
        const factory = new MembershipFactory();

        const baseName = await action.copyMembership();
        const membership = factory.createNameDuplicateDifferentCase(baseName);

        await action.goto();
        await action.editMembership(membership.name);
        const errorVisible = await action.isNameErrorVisible();
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });
});