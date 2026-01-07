    import { test, expect } from '@playwright/test';
    import { JobTitleFactory } from "../job-titles-factory";
    import { LoginPage } from "../../../login/login-page/LoginPage";
    import { JobPage } from '../../job-page';
    import { AddJobTitlesAction } from './add-job-titles-action';
   

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    test.beforeEach(async ({ page }) => {
        const loginpage = new LoginPage(page);
        await loginpage.goto();
        await loginpage.login(ADMIN_USERNAME!, ADMIN_PASSWORD!);
        const jobpage = new JobPage(page);
        await jobpage.goto();
        await jobpage.navigateToJobTitles();

    });

    test.describe("Kiểm tra thêm chức danh công việc mới hợp lệ", () => {
        const factory = new JobTitleFactory();

        test("Thêm chức danh công việc với dữ liệu tối thiểu", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidWithMinimalFields();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên 1 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWith1Characters();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên và mô tả 1 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createNameAndDescriptionWith1Characters();
            await action.addAndVerifyJobTitle({ name: data.name, description: data.description });
        });

        test("Thêm chức danh với tên và mô tả 399 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createNameAndDescriptionWith399Characters();
            await action.addAndVerifyJobTitle({ name: data.name, description: data.description });
        });

        test("Thêm chức danh với tên và mô tả 400 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createNameAndDescriptionWith400Characters();
            await action.addAndVerifyJobTitle({ name: data.name, description: data.description });
        });

        test("Thêm chức danh với tên có ký tự đặc biệt", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWithSpecialCharacters();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên và ghi chú 399 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createNameAndNoteWith399Characters();
            await action.addAndVerifyJobTitle({ name: data.name, note: data.note });
        });

        test("Thêm chức danh với tên và ghi chú 400 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createNameAndNoteWith400Characters();
            await action.addAndVerifyJobTitle({ name: data.name, note: data.note });
        });

        test("Thêm chức danh với tên và ghi chú có ký tự đặc biệt", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createNameAndNoteWithSpecialCharacters();
            await action.addAndVerifyJobTitle({ name: data.name, note: data.note });
        });

        test("Thêm chức danh với mọi thông tin đều được điền", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createAllFieldsFilled();
            await action.addAndVerifyJobTitle({ name: data.name, description: data.description, note: data.note, file: data.file });
        });

        test("Thêm chức danh với tên paste từ nơi khác", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameByPastingText();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với ghi chú paste từ nơi khác", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNoteByPastingText();
            await action.addAndVerifyJobTitle({ name: data.name, note: data.note });
        });

        test("Thêm chức danh với mô tả paste từ nơi khác", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidDescriptionByPastingText();
            await action.addAndVerifyJobTitle({ name: data.name, description: data.description });
        });

        test("Thêm chức danh với 1 space ở đầu tên", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWith1SpaceCharacterAtTheBeginning();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với 1 space ở cuối tên", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWith1SpaceCharacterAtTheEnd();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với nhiều space ở đầu tên", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWithLeadingSpaces();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với nhiều space ở cuối tên", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWithTrailingSpaces();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với space ở giữa tên", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWithMiddleSpaces();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên 99 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWith99Characters();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên 100 ký tự", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWith100Characters();
            await action.isNameErrorVisible();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên có ký tự số", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWithNumberCharacters();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên tiếng Trung", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWithChineseCharacters();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh với tên tiếng Việt", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const data = factory.createValidNameWithVietnameseCharacters();
            await action.addAndVerifyJobTitle({ name: data.name });
        });

        test("Thêm chức danh trùng tên nhưng khác hoa/thường", async ({ page }) => {
            const action = new AddJobTitlesAction(page);
            const base = factory.createValidWithMinimalFields();
            await action.addAndVerifyJobTitle({ name: base.name });
            const dup = factory.createValidNameSameWithExistingJobDifferentUppercase(base.name);
            await action.addJobTitle({ name: dup.name });
            const exists = await action.isJobTitleExist(dup.name);
            expect(exists).toBeTruthy();
        });
    });
    test.describe("Kiểm tra thêm chức danh công việc không hợp lệ", () => {
    const factory = new JobTitleFactory();

    test("Thêm chức danh với mọi thông tin để trống", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidEmptyAllFields();
        await action.addJobTitle({ name: data.name, description: data.description, note: data.note, file: data.file });
        expect(await action.isNameErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với chỉ tên công việc để trống", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidEmptyName();
        await action.addJobTitle({ name: data.name, description: data.description, note: data.note });
        expect(await action.isNameErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh trùng tên công việc cũ", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const existingName = await action.copyFirstJobTitle();
        if (!existingName) throw new Error("Không có job title để test trùng");

        await action.addJobTitle({ name: existingName });
        expect(await action.isNameErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với tên toàn ký tự space", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidNameWithOnlySpaces();
        await action.addJobTitle({ name: data.name });
        expect(await action.isNameErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với tên 101 ký tự", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidNameWith101Characters();
        await action.addJobTitle({ name: data.name });
        expect(await action.isNameErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với tên 255 ký tự", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidNameWith255Characters();
        await action.addJobTitle({ name: data.name });
        expect(await action.isNameErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với tên có emoji", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidNameWithEmoji();
        await action.addJobTitle({ name: data.name });
        expect(await action.isNameErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với mô tả 401 ký tự", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidDescriptionWith401Characters();
        await action.addJobTitle({ name: data.name, description: data.description });
        expect(await action.isDescriptionErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với mô tả 600 ký tự", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidDescriptionWith600Characters();
        await action.addJobTitle({ name: data.name, description: data.description });
        expect(await action.isDescriptionErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với ghi chú có emoji", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidNoteWithEmoji();
        await action.addJobTitle({ name: data.name, note: data.note });
        expect(await action.isNoteErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với ghi chú 401 ký tự", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidNoteWith401Characters();
        await action.addJobTitle({ name: data.name, note: data.note });
        expect(await action.isNoteErrorVisible()).toBeTruthy();
    });

    test("Thêm chức danh với ghi chú 600 ký tự", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const data = factory.createInvalidNoteWith600Characters();
        await action.addJobTitle({ name: data.name, note: data.note });
        expect(await action.isNoteErrorVisible()).toBeTruthy();
    });

    // Các case tên đã có + ký tự space
    test("Tên đã có + 1 space ở đầu", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const existingName = await action.copyFirstJobTitle();
        if (!existingName) throw new Error("Không có job title để test trùng");

        await action.addJobTitle({ name: ` ${existingName}` });
        expect(await action.isGlobalErrorNotificationVisible()).toBeTruthy();
    });

    test("Tên đã có + 1 space ở cuối", async ({ page }) => {
    const action = new AddJobTitlesAction(page);
    const existingName = await action.copyFirstJobTitle();
    if (!existingName) throw new Error("Không có job title để test trùng");

    await action.addJobTitle({ name: `${existingName} ` });
    expect(await action.isGlobalErrorNotificationVisible() || action.isNameErrorVisible()).toBeTruthy();
    });

    test("Tên đã có + nhiều space ở đầu", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const existingName = await action.copyFirstJobTitle();
        if (!existingName) throw new Error("Không có job title để test trùng");

        await action.addJobTitle({ name: `  ${existingName}` });
        expect(await action.isGlobalErrorNotificationVisible() || action.isNameErrorVisible()).toBeTruthy();
    });

    test("Tên đã có + nhiều space ở cuối", async ({ page }) => {
        const action = new AddJobTitlesAction(page);
        const existingName = await action.copyFirstJobTitle();
        if (!existingName) throw new Error("Không có job title để test trùng");

        await action.addJobTitle({ name: `${existingName}  ` });
        expect(await action.isGlobalErrorNotificationVisible() || action.isNameErrorVisible()).toBeTruthy();
    });
});
