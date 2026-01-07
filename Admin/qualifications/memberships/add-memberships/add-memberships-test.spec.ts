// add-membership.spec.ts
import { test, expect } from "@playwright/test";
import { AddMembershipAction } from "./add-memberships-action";
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

test.describe("Thêm mới thẻ hội viên - các hành vi hợp lệ và cạnh biên", () => {
    test("Tên có 1 ký tự số", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWith1Digit();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 49 ký tự đặc biệt", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWith49SpecialCharacters();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 50 ký tự tiếng Việt", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWith50VietnameseCharacters();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên là ký tự tiếng Trung", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWithChineseCharacters();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 1 space ở đầu", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWithOneSpaceAtStart();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có 1 space ở cuối", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWithOneSpaceAtEnd();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có nhiều space ở đầu", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWithMultipleSpacesAtStart();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên có nhiều space ở cuối", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWithMultipleSpacesAtEnd();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên được paste hợp lệ", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createValidPastableName();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });

    test("Tên trùng nhưng khác hoa thường", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const baseName = await action.copyMembership();
        const membership = factory.createNameDuplicateDifferentCase(baseName);

        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeFalsy();
        expect(exists).toBeTruthy();
    });
});

test.describe("Thêm mới thẻ hội viên - các hành vi không hợp lệ", () => {
    test("Tên để trống", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createEmptyName();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên có 51 ký tự", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWith51Characters();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên có 200 ký tự", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWith200Characters();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên toàn space", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const membership = factory.createNameWithOnlySpaces();
        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });

    test("Tên trùng với tên có sẵn", async ({ page }) => {
        const action = new AddMembershipAction(page);
        const factory = new MembershipFactory();

        const baseName = await action.copyMembership();
        const membership = factory.createNameDuplicateDifferentCase(baseName);

        const errorVisible = await action.addAndVerifyMembership(membership);
        const exists = await action.isMembershipExist(membership.name!);

        expect(errorVisible).toBeTruthy();
        expect(exists).toBeFalsy();
    });
});
